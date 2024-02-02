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

const isMobile = () => {
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
      headerHeight: 54,
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

  const fixedHeaders = attrs.headers.filter(d => d.isFixed)

  let store,
    showMoreOrLessBtn,
    container, // container div (d3 selection)
    table, // table.choropleth div
    tableHeader, // header div
    tableRow, // table rows (d3 selection)
    tBody, // table body div
    tableHeadCells, // table header cells (d3 selection)
    transitionDuration = 750, // how long should the transition take
    headers = attrs.headers, // headers passed from main.js
    currentSort = null, // current sort column
    pageSize,
    highlightFn,
    fixedSpaceArea = d3.sum(fixedHeaders, d => d.width || 0),
    cumsum = d3.cumsum(fixedHeaders.map(d => d.width).reverse()).reverse(),
    fixedLookup = new Map(fixedHeaders.map((d, i) => [d.id, cumsum[i]]));

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
    viewPortWidth = container.node().getBoundingClientRect().width;
    currentSort = headers.find((d) => d.order);

    table = container
      .patternify({
        tag: "div",
        selector: "table-grid",
      })
      .style("margin-left", fixedSpaceArea + "px")

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

    drawAll();
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
        .attr(
          "class",
          "show-btn bg-white flex items-center justify-center  block w-full text-white p-4 rounded-md"
        )
        .attr("data-order", "more")
        .html('TEST')
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
  }

  function addTableHead(resize) {
    tableHeadCells = tableHeader
      .patternify({
        tag: "div",
        selector: "table-head",
        data: headers,
      })
      .attr("class", (d) => {
        return `table-head ${d.isFixed ? 'fixed-column' : ''} ${d.tableHeaderClass || ''}`
      })
      .attr("data-rank", (d) => d.rankProp)
      .style("width", d => d.width + "px")
      .style('min-width', d => d.width + 'px')
      .style("position", d => d.isFixed ? "absolute" : null)
      .style("margin-left", (d, i) => {
        if (!d.isFixed) return null
        return -1 * fixedLookup.get(d.id) + "px"
      });

    tableHeadCells.each(function (d) {
      if (resize && d.isFixed) {
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
      });

    });

    if (attrs.sortable) {
      // click events for the columns with has sort true
      tableHeadCells
        .filter((d) => d.sort)
        .on("click", (e, d) => {
          e.target.classList.add('test')
          console.log(e.target)

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

    const tableData = tableRow.patternify({
      tag: "div",
      selector: "table-data",
      data: row => headers.map(header => ({ ...header, row })),
    })
      .attr("class", (d) => {
        return `table-data ${d.isFixed ? 'fixed-column' : 'value-column'} ${d.tableBodyClass || ""}`
      })
      .style("width", d => d.width + "px")
      .style('min-width', d => d.width + 'px')
      .style("height", attrs.cellHeight + "px")
      .style("position", d => d.isFixed ? "absolute" : null)
      .style("margin-left", (d, i) => {
        if (!d.isFixed) return null
        return -1 * fixedLookup.get(d.id) + "px"
      });

    tableData
      .patternify({
        tag: "div",
        selector: "table-data-inner",
        data: d => [d],
      })
      .html((header) => {
        const { cellTemplate, row, propName } = header
        const cellValue = getValue(row, propName)

        if (typeof cellTemplate === "function") {
          return cellTemplate(
            header,
            row,
          )
        }

        return cellValue;
      });
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
          icon.classed("active", true);
          icon.classed(x.order === "asc" ? "desc" : "asc", false);
          icon.classed(x.order, true);
        } else {
          x.order = null;
          icon.classed("active", false);
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

      table.style("height", (tableHeight + 10) + "px");
    }, 0);
  }

  function adjustShowBtn() {
    if (store.onlyOnePage) {
      showMoreOrLessBtn.style("display", "none");
    } else {
      showMoreOrLessBtn.style("display", null);
      if (store.currentData.length >= store.filtered_data.length) {
        showMoreOrLessBtn.html("Show less").attr("data-order", "less");
      } else {
        showMoreOrLessBtn.html(`<svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.43934 0.43934C1.02513 -0.146447 1.97487 -0.146447 2.56066 0.43934L7.5 5.37868L12.4393 0.43934C13.0251 -0.146447 13.9749 -0.146447 14.5607 0.43934C15.1464 1.02513 15.1464 1.97487 14.5607 2.56066L8.56066 8.56066C7.97487 9.14645 7.02513 9.14645 6.43934 8.56066L0.43934 2.56066C-0.146447 1.97487 -0.146447 1.02513 0.43934 0.43934Z" fill="#100C08"/>
        </svg>
        `).attr("data-order", "more");
      }
    }
  }

  function updateRows() {
    addTableBody();
    adjustHeight();

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