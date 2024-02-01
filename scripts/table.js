const getMobileBreakdown = () => {
  const viewport = window.innerWidth;

  if (viewport <= 576) {
    return "xs";
  } else if (viewport <= 768) {
    return "sm";
  } else if (viewport <= 992) {
    return "md";
  } else if (viewport <= 1200) {
    return "lg";
  } else {
    return "rest";
  }
};

const isMobile = (mobileBreakdown) => {
  return true;
};

function Table(params) {
  const attrs = Object.assign(
    {
      id: Math.floor(Math.random() * 10000000),
      container: "body",
      data: [], // all data
      headers: [], // column configs
      cellHeight: 44, // height of each cells in table body
      cellWidth: 84,
      gapWidth: 8,
      headerHeight: 83,
      firstColumnWidth: {
        // city column width (varies based on screen size),
        xs: 165,
        sm: 210,
        md: 210,
        lg: 210,
        rest: 210,
      },
      pageSize: {
        // show
        xs: 10,
        sm: 10,
        md: 10,
        lg: 10,
        rest: 10,
      },
      numOfColumnsMobile: {
        xs: 3,
        sm: 3,
        md: 4,
        lg: 5,
        rest: 5,
      },
      pagination: true,
      mobileBreakdown: "xs",
      sortable: true,
      showValues: false,
      onSearch: () => { },
      doneHeadersLoading: () => { }
    },
    params
  );

  let store,
    showMoreOrLessBtn,
    eachWidth = attrs.gapWidth + attrs.cellWidth,
    viewPortWidth,
    container, // container div (d3 selection)
    table, // table.choropleth div
    tableHeader, // header div
    tableRow, // table rows (d3 selection)
    tBody, // table body div
    tableHeadCells, // table header cells (d3 selection)
    transitionDuration = 750, // how long should the transition take
    headers = attrs.headers, // headers passed from main.js
    currentSort = null, // current sort column
    timer,
    firstColumnWidth,
    scrollWidth,
    pageSize,
    highlightFn;

  const getValue = (d, propName) => {
    let prop = propName;
    if (typeof propName === "function") {
      prop = propName(d);
    }
    return d[prop];
  };

  function main() {
    setDimensions();

    store = new DataStore(attrs.data, pageSize);
    container = d3.select(attrs.container);
    currentSort = headers.find((d) => d.order);

    table = container
      .patternify({
        tag: "div",
        selector: "table-grid",
      })
    // .on("scroll", function () {
    //   adjustScrollBar(this.scrollLeft);
    // });

    tableHeader = table.patternify({
      tag: "div",
      selector: "table-header",
    });

    table.patternify({
      tag: "div",
      selector: "table-divider",
    }).html("<div class='line'></div>");

    tBody = table
      .patternify({
        tag: "div",
        selector: "table-body",
      })
      .style("position", "relative");

    drawAll();
  }

  function addScrollBar() {
    if (isMobile(attrs.mobileBreakdown)) {
      container.patternify({
        tag: "div",
        selector: "scroll-bar",
      });
      container.patternify({
        tag: "div",
        selector: "scroll-bar-back",
      })
    } else {
      container.selectAll(".scroll-bar").remove();
      container.selectAll(".scroll-bar-back").remove();
    }
  }

  function adjustScrollBar(left) {
    const tBodyWidth = tBody.node().getBoundingClientRect().width;
    const p = left / (scrollWidth - firstColumnWidth);

    container
      .selectAll(".scroll-bar")
      .style("left", firstColumnWidth + p * tBodyWidth + "px");
  }

  function setDimensions() {
    const br = getMobileBreakdown();

    if (isMobile(attrs.mobileBreakdown)) {
      attrs.pagination = true;
    } else {
      attrs.pagination = false;
    }

    pageSize = attrs.pagination ? attrs.pageSize[br] : attrs.data.length + 1;
    showNColumnsMobile = attrs.numOfColumnsMobile[br];
    firstColumnWidth = attrs.firstColumnWidth[br];

    if (store) {
      store.pageSize = pageSize;
    }
  }

  function drawAll(resize) {
    if (attrs.pagination) {
      showMoreOrLessBtn = container
        .patternify({
          tag: "button",
          selector: "show-btn",
        })
        // .attr(
        //   "class", 
        //   "show-btn bg-black text-center my-3 block w-full text-white p-4 rounded-md"
        // )
        // .attr("data-order", "more")
        // .html("Show more")
        .on("click", function () {
          if (store.currentData.length >= store.filtered_data.length) {
            collapse();
          } else {
            showMore();
          }
        });

      adjustShowBtn();
    } else {
      container.selectAll(".show-btn").remove();
    }

    d3.select(".table-head.main-column").style("height", null);

    addTableHead(resize);
    addTableBody();
    adjustHeight();

    if (attrs.sortable) {
      if (currentSort) {
        sortTableBy(currentSort, false);
      }
    }

    addScrollBar();
    makeItResponsive();
  }

  function addTableHead(resize) {
    tableHeadCells = tableHeader
      .patternify({
        tag: "div",
        selector: "table-head",
        data: headers,
      })
      .attr("class", (d, i) => {
        return (
          "table-head" +
          (d.isMainColumn ? " main-column" : "") +
          (d.class ? " " + d.class : "")
        );
      })
      .attr("data-rank", (d) => d.rankProp)
      .style("width", getWidth);

    let counter = 0;

    tableHeadCells.each(function (d) {
      if (resize && d.isMainColumn) {
        return;
      }

      d.headerTemplate(d).then(html => {
        d3.select(this).html(html);

        if (d.tooltip) {
          if (this._tippy) {
            this._tippy.destroy();
          }

          tippy(this, {
            theme: "light",
            content: `<div class="table-tooltip">${d.tooltip}</div>`,
            arrow: false,
            allowHTML: true,
            maxWidth: 200,
            placement: "top",
          });
        }

        counter++;

        if (counter === headers.length) {
          attrs.doneHeadersLoading()
        }
      });

    });

    if (attrs.sortable) {
      // click events for the columns with has sort true
      tableHeadCells
        .filter((d) => d.sort)
        .on("click", (e, d) => {
          if (d.order == "asc") {
            d.order = "desc";
          } else {
            d.order = "asc";
          }

          sortTableBy(d);
          tBody.node().scrollTop = 0;
        });
    }
  }

  function getTopCoord(d, i) {
    return i * attrs.cellHeight + "px";
  }

  function addTableBody() {
    tableRow = tBody.patternify({
      tag: "div",
      selector: "table-row",
      data: store.currentData,
    });

    if (attrs.sortable) {
      tableRow.style("left", "0px").style("top", getTopCoord);
    }

    tableRow.each(function (d, i) {
      var that = d3.select(this);

      that.attr("data-index", i);

      var tableData = that
        .patternify({
          tag: "div",
          selector: "table-data",
          data: headers,
        })
        .attr("class", (d) => {
          return (
            "table-data" +
            (d.isMainColumn ? " main-column" : " value-column") +
            (d.class ? " " + d.class : "")
          );
        })
        .style("width", getWidth)
        .style("height", attrs.cellHeight + "px");

      tableData
        .patternify({
          tag: "div",
          selector: "table-data-inner",
          data: (m) => [m],
        })
        .html((x) => {
          if (x.cellTemplate && typeof x.cellTemplate === "function") {
            return x.cellTemplate(
              {
                ...d,
                value: getValue(d, x.propName),
              },
              i,
              store.currentData,
              attrs.showValues
            );
          }

          return getValue(d, x.propName);
        });
    });

    // adjustScrollBar(0);
  }

  function sortTableBy(d, animate = true) {
    if (!d.sort) return;

    store.sort((a, b) => d.sort(a, b, d.order))
    updateRows()

    // grey out all icons and clear order property for other headers
    tableHeadCells
      .filter((d) => d.sort)
      .each(function (x) {
        const icon = d3.select(this);

        if (x.id === d.id) {
          // icon.classed("active", true);
          icon.classed(x.order === "asc" ? "desc" : "asc", false);
          icon.classed(x.order, true);
        } else {
          x.order = null;
          // icon.classed("active", false);
          icon.classed("desc", false);
          icon.classed("asc", false);
        }
      });

    // sorting table rows
    tableRow
      .sort((a, b) => d.sort(a, b, d.order))
      .attr("data-index", (_, i) => i)
      .transition()
      .duration(animate ? transitionDuration : 0)
      .ease(d3.easeSin)
      .style("top", getTopCoord);

    currentSort = d;
  }

  function getWidth(d) {
    if (d.isMainColumn) {
      return firstColumnWidth + "px";
    }

    return `calc((100% - ${firstColumnWidth}px) / ${headers.length - 1})`;
  }

  function adjustHeight() {
    setTimeout(() => {
      const isItMobile = isMobile(attrs.mobileBreakdown);

      const tableHeaderHeight = attrs.headerHeight;

      let tableHeight =
        tableHeaderHeight + attrs.cellHeight * store.currentData.length;

      if (store.currentData.length > 10 && !isItMobile) {
        tableHeight =
          tableHeaderHeight +
          attrs.cellHeight * Math.min(10, store.currentData.length);

        tBody
          .style("height", attrs.cellHeight * 10 + "px")
          .style("overflow-y", "auto")
          .style("scroll-behavior", "smooth");
      } else {
        tBody
          .style("height", null)
          .style("overflow-y", null)
          .style("scroll-behavior", null);
      }

      table.style("height", (tableHeight + 25) + "px");

      // container
      //   .selectAll(".scroll-bar")
      //   .style("top", tableHeaderHeight - 8 + "px")
      //   .style("left", firstColumnWidth + "px");

      // container
      //   .selectAll(".scroll-bar-back")
      //   .style("top", tableHeaderHeight - 8 + "px")
      //   .style("left", firstColumnWidth + "px");
    }, 0);
  }

  function makeItResponsive() {
    viewPortWidth = container.node().getBoundingClientRect().width;

    const w =
      Math.max(
        viewPortWidth,
        eachWidth * (headers.length - 1) + firstColumnWidth
      );

    scrollWidth = w;

    if (isMobile(attrs.mobileBreakdown)) {
      tBody.style("position", "static");
      table.classed("responsive", true);

      tableRow
        .style("width", w - firstColumnWidth + "px")
        .style("position", "static");

      tableHeader.style("width", w - firstColumnWidth + "px");

      table
        .selectAll(".main-column")
        .style("position", "absolute")
        .style("margin-left", -firstColumnWidth + "px");

      table.style("margin-left", firstColumnWidth + "px");

      table
        .selectAll(".value-column")
        .style("width", eachWidth + "px");

      table.selectAll(".table-head").style("width", (d, i) => {
        if (d.isMainColumn) return firstColumnWidth + "px";
        return eachWidth + "px";
      });

      // SCROLL BAR
      // const totalWidth = w - firstColumnWidth;
      // const tBodyWidth = tBody.node().getBoundingClientRect().width;
      // const scrollBarWidth = tBodyWidth / totalWidth;

      // container
      //   .selectAll(".scroll-bar")
      //   .style("width", tBodyWidth * scrollBarWidth + "px");

      // container
      //   .selectAll(".scroll-bar-back")
      //   .style("width", eachWidth * showNColumnsMobile + "px");
    } else {
      table.classed("responsive", false);
      table
        .selectAll(".main-column")
        .style("position", null)
        .style("margin-left", null);

      table.selectAll(".table-head").style("width", getWidth);

      table
        .selectAll(".table-data")
        .style("width", getWidth)
        .style("height", attrs.cellHeight + "px");

      tBody.style("position", "relative");
      table.style("margin-left", null);

      tableRow
        .style("width", null)
        .style("margin-left", null)
        .style("position", null);

      tableHeader.style("width", null).style("margin-left", null);
    }
  }

  function adjustShowBtn() {
    if (store.onlyOnePage) {
      showMoreOrLessBtn.style("display", "none");
    } else {
      showMoreOrLessBtn.style("display", null);
      if (store.currentData.length >= store.filtered_data.length) {
        showMoreOrLessBtn.html("Show less").attr("data-order", "less");
      } else {
        // showMoreOrLessBtn.html("Show more").attr("data-order", "more");
      }
    }
  }

  function updateRows() {
    addTableBody();

    adjustHeight();

    makeItResponsive();

    if (highlightFn) {
      highlightRow(highlightFn)
    }
  }

  function showMore() {
    store.nextPage();
    adjustShowBtn();
    updateRows();

    if (currentSort && attrs.sortable) {
      sortTableBy(currentSort, false);
    }
  }

  function collapse() {
    store.collapse();
    adjustShowBtn();
    updateRows();

    if (currentSort && attrs.sortable) {
      sortTableBy(currentSort, false);
    }
  }

  function highlightRow(predicate) {
    highlightFn = predicate

    tableRow.classed("highlighted", predicate);

    setTimeout(() => {
      const rowBeingHighlighted = tableRow.filter(predicate);

      // if (isMobile(attrs.mobileBreakdown)) {
      if (rowBeingHighlighted.empty() && store.currentData.length < store.all_data.length) {
        // recursively showMore and search for city
        showMore();
        highlightRow(predicate);
      } else if (!rowBeingHighlighted.empty()) {
        const index = +rowBeingHighlighted.attr("data-index");
        const coord = getTopCoord(null, index);
        tBody.node().scrollTop = +coord.replace("px", "");
      }
      // } 
      // else {
      //   if (!rowBeingHighlighted.empty()) {
      //     const index = +rowBeingHighlighted.attr("data-index");
      //     const coord = getTopCoord(null, index);
      //     tBody.node().scrollTop = +coord.replace("px", "");
      //   }
      // }
    }, 0);
  }

  main.filter = function (fn) {
    store.filter(fn);
    updateRows();
    return main;
  };

  main.render = function () {
    main();
    // // window resize
    // d3.select(window).on("resize." + attrs.id, function () {
    //   if (timer) clearTimeout(timer);
    //   timer = setTimeout(() => {
    //     setDimensions();
    //     drawAll(true);
    //   }, 100);
    // });
    return main;
  };

  main.highlightRow = highlightRow;

  main.toggleValues = (showValues) => {
    attrs.showValues = showValues
    updateRows()
  }

  return main;
}