function getFlag(country, className = 'small-flag') {
  return `<div class="flex align-center">
    <img class="${className}" src="./images/flags/l/${this.countryCodes.get(
    country
  )}.svg" /> ${country}
  </div>`
}
const arrowIcon = `<svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.65634 3.80474C6.38855 4.06509 5.95438 4.06509 5.68659 3.80474L3.42861 1.60948L1.17062 3.80474C0.902834 4.06509 0.468664 4.06509 0.200876 3.80474C-0.0669122 3.54439 -0.0669122 3.12228 0.200876 2.86193L2.94373 0.195262C3.21152 -0.0650873 3.64569 -0.0650873 3.91348 0.195262L6.65634 2.86193C6.92412 3.12228 6.92412 3.54439 6.65634 3.80474Z" fill="#AB182D"/>
</svg>
`

function mainHeaderTemplate() {
  return fakePromise(`

  `)
}

function headerTemplate() {
  const name = this.name
  const icon = this.icon
  return fakePromise(icon).then(iconStr => {
    return `<button class="header-btn">
     <div class='w-full h-full'>
        <div class='icon flex items-center justify-center'> ${arrowIcon} </div>
        <div class="w-full flex align-center justify-center column-label">
          <div class="label  text-black px-0.5 py-2 font-light">${name}</div>
        </div>     
      </div> 
    </button>`
  })
}

{/* <img src="./images/flags/l/${d["Country Code"]}.svg" class="mr-2 w-[20px] h-[15px]" />  */ }
// function mainCellTemplate(d) {
//   const propName = this.propName
//   return `<div class=" w-full h-full rounded-md py-1 px-3 text-black text-[14px] flex items-center">
//     <div class="truncate text-[24px] py-2 font-tungsten font-bold ... uppercase"> ${d[propName]} </div>
//   </div>`
// }

function cellTemplate(header, row) {
  const format = header.format || (m => m)
  const scale = header.colorScale
  const rank = row[header.rankProp]
  const color = scale(rank)
  const textColor = header.textColor
  let value = `${format(row[header.propName])}`

  return `
  <div class="color-box" style="background-color: ${color}; color: ${textColor};">
    ${value}  
  </div>`
}

function sortFunc(a, b, order) {
  let orderFunc = order == 'asc' ? 'ascending' : 'descending'

  return d3[orderFunc](a[this.rankProp], b[this.rankProp])
}

const colors = [
  "#AB182D",
  '#AB182D80',
  '#100C0880',
  '#100C08',
]

function getHeaders(data, chosenRank = 'overall rank') {
  const columns = [
    {
      id: 1,
      isFixed: true,
      textColor: 'white',
      width: 56,
      name: 'Rank',
      propName: chosenRank,
      rankProp: chosenRank,
      tableHeaderClass: '',
      tableBodyClass: 'font-arial text-sm',
      order: 'asc',
      sort: sortFunc,
      format: ordinal_suffix_of,
      cellTemplate,
      headerTemplate,
    },
    {
      id: 2,
      isFixed: true,
      width: 140,
      textColor: 'black',
      name: 'Resort',
      propName: 'resort',
      rankProp: 'resort',
      tableHeaderClass: 'resort-header-column',
      description: '',
      tableBodyClass: 'uppercase font-tungsten font-bold leading-5 text-xl text-start resort-column',
      sort: sortFunc,
      format: v => v,
      cellTemplate,
      headerTemplate,
    },
    {
      id: 3,
      width: 96,
      textColor: 'black',
      name: 'Country',
      propName: 'country',
      rankProp: 'country',
      tableHeaderClass: 'country-header-column',
      description: '',
      icon: './images/icons/icon.svg',
      tableBodyClass: 'uppercase font-tungsten font-bold leading-5 text-xl text-start country-column',
      cellTemplate,
      sort: sortFunc,
      headerTemplate,
    },
    {
      id: 4,
      width: 90,
      textColor: 'white',
      name: 'Overall score /100',
      propName: 'total score',
      rankProp: 'overall rank',
      tableHeaderClass: '',
      order: 'asc',
      description: '',
      icon: './images/icons/icon.svg',
      tableBodyClass: 'font-arial text-sm',
      sort: sortFunc,
      format: v => v,
      cellTemplate,
      headerTemplate,
    },

    {
      id: 5,
      width: 104,
      textColor: 'white',
      name: 'Avg. TripAdvisor Score',
      propName: 'tripadvisor score',
      rankProp: 'tripadvisor rank',
      tableHeaderClass: '',
      description: '',
      icon: './images/icons/icon.svg',
      tableBodyClass: 'font-arial text-sm',
      infoOrder: 1,
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
    },
    {
      id: 6,
      width: 96,
      textColor: 'white',
      name: 'Instagram Hashtags',
      propName: 'hastags number',
      rankProp: 'hashtag rank',
      tableHeaderClass: '',
      description: '',
      icon: './images/icons/icon.svg',
      infoOrder: 2,
      tableBodyClass: 'font-arial text-sm',
      format: formatThousand,
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
    },
    {
      id: 7,
      width: 96,
      textColor: 'white',
      name: 'Price of Food and Drink',
      propName: 'food and drinks cost',
      rankProp: 'food and drinks rank',
      tableHeaderClass: '',
      icon: './images/icons/icon.svg',
      description: '',
      infoOrder: 3,
      tableBodyClass: 'font-arial text-sm',
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
      format: v => "£" + v
    },
    {
      id: 8,
      width: 88,
      textColor: 'white',
      name: 'Ski Pass Price',
      propName: 'ski pass cost',
      rankProp: 'ski pass cost rank',
      tableHeaderClass: '',
      description: '',
      icon: './images/icons/icon.svg',
      infoOrder: 4,
      tableBodyClass: 'font-arial text-sm',
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
      format: v => "£" + v
    },

  ]

  return columns.map((d, i) => {
    const col = {
      ...d,
      id: i + 1,
    }

    const extent = d3.extent(data, x => x[d.rankProp])
    col.colorScale = d3.scaleQuantile(extent, colors)

    data.forEach(datum => {
      datum[d.rankProp + '_is_equal'] = data.filter(x => x[d.rankProp] === datum[d.rankProp]).length > 1
    })

    return col
  })
}