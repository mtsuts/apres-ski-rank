function getFlag(country, className = 'small-flag') {
  return `<div class="flex align-center">
    <img class="${className}" src="./images/flags/l/${this.countryCodes.get(
    country
  )}.svg" /> ${country}
  </div>`
}

function mainHeaderTemplate() {
  return fakePromise(`

  `)
}

function headerTemplate() {
  const name = this.name
  const icon = this.icon

  return loadSvg(icon).then(iconStr => {
    return `<button class="header-btn flex align-center justify-center">
      <div class="w-full">
        <div class="label text-black px-0.5 py-2 font-light">${name}</div>
      </div>
    </button>`
  })
}

{/* <img src="./images/flags/l/${d["Country Code"]}.svg" class="mr-2 w-[20px] h-[15px]" />  */ }
function mainCellTemplate(d) {
  const propName = this.propName
  return `<div class=" w-full h-full rounded-md py-1 px-3 text-black text-[14px] flex items-center">
    <div class="truncate text-[24px] font-tungsten font-bold ... uppercase"> ${d[propName]} </div>
  </div>`
}

function cellTemplate(d, i, arr, showValue) {
  const format = this.format || (m => m)
  const scale = this.colorScale
  const rank = d[this.rankProp]
  const color = scale(rank)
  const textColor = color === '#CD4A86' || color === '#0096B2' ? '#ffffff' : '#192435'
  const prefix = d[this.rankProp + '_is_equal'] ? '=' : ''

  let value = showValue ? d[this.propName] : `${prefix}${format(rank)}`

  if (this.isOverall) {
    value = format(d[this.propName])
  }

  return `<div class="color-box" style="background-color: ${color}; color: ${textColor};">
    ${value}
  </div>`
}

function sortFunc(a, b, order) {
  let orderFunc = order == 'asc' ? 'ascending' : 'descending'

  return d3[orderFunc](a[this.rankProp], b[this.rankProp])
}

const colors = [
  '#DC874B',
  'rgba(220, 135, 75, 0.5)',
  'rgba(98, 168, 198, 0.5)',
  '#62A8C6',
]

function getHeaders(data) {
  const columns = [
    {
      id: 1,
      isMainColumn: true,
      name: 'test',
      propName: 'resort',
      rankProp: 'resort',
      description: '',
      icon: '',
      class: '',
      cellTemplate: mainCellTemplate,
      headerTemplate: mainHeaderTemplate,
    },
    {
      id: 2,
      isOverall: true,
      name: 'Overall score /100',
      propName: 'FINAL RANK',
      rankProp: 'FINAL RANK',
      description: '',
      order: 'asc',
      icon: './images/overall.svg',
      class: '',
      infoOrder: 6,
      cellTemplate,
      format: ordinal_suffix_of,
      sort: sortFunc,
      headerTemplate,
    },
    {
      id: 3,
      name: 'Restaurants',
      propName: '4.5* restaurants and above',
      rankProp: 'restaurants rank',
      description: '',
      icon: './images/restaurants.svg',
      class: '',
      infoOrder: 1,
      format: ordinal_suffix_of,
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
    },
    {
      id: 4,
      name: 'Private jets',
      propName: 'Number of private jet charters',
      rankProp: 'jet rank',
      description: '',
      icon: './images/jets.svg',
      infoOrder: 2,
      class: '',
      format: ordinal_suffix_of,
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
    },
    {
      id: 5,
      name: 'Accommodation',
      propName: '5* accommodation',
      rankProp: 'accommodation rank',
      icon: './images/accomodation.svg',
      description: '',
      infoOrder: 3,
      class: '',
      format: ordinal_suffix_of,
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
    },
    {
      id: 6,
      name: 'Yacht clubs',
      propName: 'Yacht clubs',
      rankProp: 'Yacht rank',
      description: '',
      icon: './images/yacht.svg',
      infoOrder: 4,
      class: '',
      format: ordinal_suffix_of,
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
    },
    {
      id: 7,
      name: 'Spas',
      propName: 'Luxury spas',
      rankProp: 'spas rank',
      description: '',
      icon: './images/spas.svg',
      infoOrder: 5,
      class: '',
      format: ordinal_suffix_of,
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
    },
    {
      id: 8,
      name: 'Sunshine',
      propName: 'Annual amount of sunshine',
      rankProp: 'sunshine Rank',
      description: '',
      icon: './images/sunshine.svg',
      infoOrder: 5,
      class: '',
      format: ordinal_suffix_of,
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
    },
  ]

  return columns.map((d, i) => {
    const col = {
      ...d,
      id: i + 1,
    }

    if (!d.isMainColumn) {
      const extent = d3.extent(data, x => x[d.rankProp])
      col.colorScale = d3.scaleQuantile(extent, colors)

      data.forEach(datum => {
        datum[d.rankProp + '_is_equal'] = data.filter(x => x[d.rankProp] === datum[d.rankProp]).length > 1
      })
    }

    return col
  })
}