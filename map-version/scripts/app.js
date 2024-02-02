class App {
  constructor() {

    this.choiceList = [
      {
        id: 1,
        value: 'Overall Score',
        icon: `<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M17.2662 2C17.3325 1.33376 17.3325 0.73376 17.3325 0H3.99999C3.99999 0.73376 3.99999 1.33376 4.06624 2H0V2.66624C0 8.6 7.53376 12.8 9.33376 13.7325L9.33251 16C9.33251 17.1337 8.46627 18 7.33251 18H5.99875V20.6662H15.3325V18H13.9987C12.865 18 11.9987 17.1337 11.9987 16V13.7337C13.7987 12.8 21.3325 8.59997 21.3325 2.66749V2.00125L17.2662 2ZM1.39998 3.33376H4.19998C4.46623 6.33376 5.19998 8.46752 5.99998 10C3.86622 8.33376 1.66622 6 1.39998 3.33376ZM15.4 10C16.2 8.46624 16.9337 6.33376 17.2 3.33376H20C19.6662 6 17.4662 8.33376 15.4 10Z" fill="currentColor"/>
				</svg>`,
        rankProp: 'overall rank',
        score: 'total score',
      },
      {
        id: 2,
        value: 'Avg. TripAdvisor score',
        icon: `<svg width="29" height="9" viewBox="0 0 29 9" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M4.86954 7.65921L2.20063 8.60859L2.27813 5.77621L0.550125 3.52992L3.26867 2.72829L4.86954 0.391167L6.47162 2.72829L9.19017 3.52992L7.46216 5.77621L7.53966 8.60859L4.86954 7.65921Z" fill="currentColor"/>
				<path d="M14.5 7.65921L11.8299 8.60859L11.9086 5.77621L10.1806 3.52992L12.8979 2.72829L14.5 0.391167L16.1021 2.72829L18.8194 3.52992L17.0914 5.77621L17.1701 8.60859L14.5 7.65921Z" fill="currentColor"/>
				<path d="M24.1305 7.65921L21.4603 8.60859L21.5378 5.77621L19.8098 3.52992L22.5284 2.72829L24.1305 0.391167L25.7313 2.72829L28.4499 3.52992L26.7219 5.77621L26.7994 8.60859L24.1305 7.65921Z" fill="currentColor"/>
				</svg>
				`,
        rankProp: 'tripadvisor rank',
        score: 'tripadvisor score',
      },
      {
        id: 3,
        value: 'Instagram hashtags',
        icon: `<svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M20.11 3.92C20.11 2.03821 18.5818 0.509998 16.7 0.509998H4.3C2.41821 0.509998 0.889999 2.03821 0.889999 3.92V15.08C0.889999 16.9618 2.41821 18.49 4.3 18.49H16.7C18.5818 18.49 20.11 16.9618 20.11 15.08V3.92ZM18.25 15.08C18.25 15.9361 17.5561 16.63 16.7 16.63H4.3C3.6485 16.63 3.06363 16.2147 2.84325 15.5947L2.75969 15.3525L11.2072 10.4021C11.9265 9.98067 12.8783 10.0545 13.5225 10.5789L18.25 14.4201L18.25 15.08ZM18.25 12.02L14.6946 9.13067C14.0032 8.57 13.1289 8.26 12.2364 8.26C11.5449 8.26 10.8632 8.44648 10.265 8.79645L2.75121 13.2019V3.92015C2.75121 3.06403 3.44508 2.37015 4.30121 2.37015H16.7012C17.5573 2.37015 18.2512 3.06403 18.2512 3.92015V12.0201L18.25 12.02Z" fill="currentColor"/>
				<path d="M7.71 6.4C7.71 7.64 5.85 7.64 5.85 6.4C5.85 5.16 7.71 5.16 7.71 6.4Z" fill="currentColor"/>
				</svg>
				`,
        rankProp: 'hashtag rank',
        score: 'hastags number',
      },
      {
        id: 4,
        value: 'Food and drink prices for a week',
        icon: `<svg width="33" height="21" viewBox="0 0 33 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M31.3837 0.93C29.5029 1.78853 28.2151 3.63574 28.1494 5.74866L27.9844 10.2037C27.9509 10.9951 28.5787 11.6551 29.3701 11.6551H29.9309L28.9073 18.2215C28.7423 19.2115 29.5338 20.1357 30.5238 20.1357C31.4481 20.1357 32.1738 19.41 32.1738 18.4857L32.1751 1.4584C32.1751 1.02913 31.7459 0.765 31.3837 0.93Z" fill="currentColor"/>
				<path d="M5.70933 0.89634C5.37933 0.89634 5.11507 1.1606 5.11507 1.4906V5.9456C5.11507 6.1106 4.98358 6.24209 4.81858 6.24209H4.45505C4.29005 6.24209 4.15857 6.1106 4.15857 5.9456V1.4906C4.15857 1.1606 3.89431 0.89634 3.5643 0.89634C3.2343 0.89634 2.97004 1.1606 2.97004 1.4906V5.9456C2.97004 6.1106 2.83855 6.24209 2.67355 6.24209L2.31003 6.24338C2.14503 6.24338 2.01354 6.11189 2.01354 5.94689V1.49057C2.01354 1.16057 1.74928 0.896309 1.41928 0.896309C1.08927 0.896309 0.825012 1.16057 0.825012 1.49057V6.7049C0.825012 7.46417 1.45148 8.09064 2.21075 8.09064H2.50723L1.88076 18.3543C1.81502 19.3108 2.57429 20.1036 3.53076 20.1036H3.56428C4.52075 20.1036 5.28001 19.3121 5.21428 18.3543L4.62001 8.05863H4.9165C5.67576 8.05863 6.30223 7.43216 6.30223 6.67289L6.30352 1.4909C6.30352 1.1609 6.03934 0.89634 5.70933 0.89634Z" fill="currentColor"/>
				<path d="M16.665 0.89634C11.3513 0.89634 7.06134 5.18634 7.06134 10.5C7.06134 15.8137 11.3513 20.1037 16.665 20.1037C21.9787 20.1037 26.2687 15.8137 26.2687 10.5C26.2687 5.18634 21.9787 0.89634 16.665 0.89634ZM20.0643 12.8757C19.9328 14.1957 18.8758 15.2192 17.5893 15.4821V16.6707C17.5893 16.8022 17.4901 16.9014 17.3586 16.9014H16.0051C15.8736 16.9014 15.7743 16.8022 15.7743 16.6707V15.4821C14.4543 15.2514 13.4308 14.1621 13.2993 12.8086C13.2993 12.6771 13.3986 12.5444 13.5636 12.5444H14.9171C15.0164 12.5444 15.1478 12.6101 15.1478 12.7429C15.2471 13.2714 15.7086 13.6993 16.2693 13.6993H17.0286C17.5893 13.6993 18.1178 13.3036 18.2171 12.7429C18.3486 12.0171 17.7878 11.3893 17.0956 11.3893H16.4021C14.8514 11.3893 13.4656 10.2679 13.3006 8.71582C13.1356 7.09934 14.2571 5.74582 15.7756 5.48155V4.29302C15.7756 4.16154 15.8749 4.06228 16.0064 4.06228H17.3599C17.4914 4.06228 17.5907 4.16154 17.5907 4.29302V5.48155C18.9107 5.71229 19.9342 6.80155 20.0657 8.15508C20.0657 8.28657 19.9664 8.41934 19.8014 8.41934H18.4479C18.3486 8.41934 18.2171 8.35359 18.2171 8.22082C18.1179 7.66009 17.6564 7.26435 17.0957 7.26435H16.3364C15.7757 7.26435 15.2471 7.66009 15.1479 8.22082C15.0164 8.94656 15.5771 9.57435 16.2693 9.57435H17.0943C18.8436 9.57564 20.2293 11.0942 20.0643 12.8757Z" fill="currentColor"/>
				</svg>
				`,
        rankProp: 'food and drinks rank',
        score: 'food and drinks cost',
      },
      {
        id: 5,
        value: 'Ski pass price',
        icon: `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M22.68 5.2H23.88V0.4H0.120003V19.36H23.88V14.56H22.68C21.96 14.56 21.48 14.08 21.48 13.36C21.48 12.76 21.96 12.16 22.68 12.16H23.88V7.6H22.68C21.96 7.6 21.48 7.12 21.48 6.4C21.48 5.8 22.08 5.2 22.68 5.2ZM21.48 3.04C20.04 3.52 19.08 4.84 19.08 6.4C19.08 7.96 20.04 9.28 21.48 9.76V10.12C20.04 10.6 19.08 11.92 19.08 13.48C19.08 15.04 20.04 16.36 21.48 16.84V17.08H2.52V2.92H21.48V3.04Z" fill="currentColor"/>
				<path d="M4.92001 11.2H16.8V13.6H4.92001V11.2Z" fill="currentColor"/>
				<path d="M4.92001 6.4H16.8V8.8H4.92001V6.4Z" fill="currentColor"/>
				</svg>
				`,
        rankProp: "ski pass cost rank",
        score: 'ski pass cost',
      }
    ]

    this.loadDataAndInit()

  }
  async loadDataAndInit() {
    try {
      let data = await d3.csv('./data/ski-data.csv', d3.autoType)
      d3.json('./data/geo.json').then((datum) => {
        this.choices = initDropdown({
          list: this.choiceList.slice().map(d => ({
            label: `
						<div class="show-in-dropdown">
							<div class='flex items-center gap-4 '> 
								<div class='w-[30px] choice-icon'>
									${d.icon} 
								</div>

								<div>${d.value}</div>
							</div>
						</div>
						
						<div class="show-in-header">
							<div class="flex items-center gap-2 ">
								<div>Order by:</div>
								<div class= "font-bold font-arialBold orderby-category"> ${d.value} </div>
							</div>
						</div>
				`,
            value: d.value
          })),
          id: '#category_sel',
          searchEnabled: false,
          searchPlaceholderValue: '',
          cb: (value) => {
            const chosenValue = this.choiceList.find(d => d.value === value)
            this.accordion(data, chosenValue.rankProp)
          }
        })
        // map initialization
        this.map = map('.map-container', datum, data)
      })

      this.accordion(data)

    } catch (e) {
      console.error(e)
    }
  }
  accordion(data, rankBy = 'overall rank') {
    const sortedData = data.slice().sort((a, b) => a[rankBy] - b[rankBy])

    d3.select('#accordion-example')
      .html('')
      .selectAll('div')
      .data(sortedData)
      .join('div')
      .attr('class', `my-2 p-2 rounded-2xl shadow-3xl`)
      .html((d, i) => `<h2 id="accordion-example-heading-${i + 1}">
      <button type="button"
        class="accordion-btn flex items-center justify-between w-full font-medium  "
        data-accordion-target="#accordion-example-body-${i + 1}" aria-expanded="false"
        aria-controls="accordion-example-body-${i + 1}">
        <div class="flex items-center gap-4">
        <div class='rounded-full bg-black px-4 py-0.5 text-[24px] font-tungsten  text-white'>${i + 1}  </div>
        <div class=''> <img src='./images/flags/${d['country code']}.svg'/> </div>
        <div class='uppercase fond-bold text-[24px] text-black font-tungsten'> ${d.resort} </div>
        </div>

        <svg data-accordion-icon class="shrink-0" aria-hidden="true" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <rect x="28" width="28" height="28" transform="rotate(90 28 0)" fill="url(#pattern0)"/>
              <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_1870_2425" transform="scale(0.00333333)"/>
              </pattern>
              <image id="image0_1870_2425" width="300" height="300" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABLKADAAQAAAABAAABLAAAAADYYILnAAAK70lEQVR4Ae3dv46UVRgGcP4kxEQ0hGikw1LuAAtNpCF2FHgFGr0NbbRUvAISSew1wUIrMZFWSysSKohUmCgQwfdLXMIssDu7zM53nnl/k5y4szs733t+z8mTcdxdDx1yI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgpcDRlrve/E0fry2+VuulWvdqParlRoAAgSEETtQUH9f6rtatWlNBba2psH6r9WWts7XcCBAgMIvA9Erq81p3a20V1G7/vF6PfaeWGwECBNYmML1aulFrt4J63tcv1fceq+VGgACBAxW4UM/+d63nldGyn/+xnmN6leZGgACBAxF4r5516430ZYtpp8f9XM+ntA4kKk9KoLfAG7X97W+q71RGy35NafU+V3ZP4EAEvqlnXbaE9vo4pXUgkXlSAj0FztS2H9baaxHt5fFKq+fZsmsCKxeY/qveXspnv49VWiuPzhMS6Cdws7a83xLa6/cprX7ny44JrEzgdD3TXkvnRR+vtFYWnyci0EvgfG33RQtoP9+vtHqds+F3e2T4CQ04CZyciWH6FZ6rtfyc1kwBuOyigMJa9Bj13uEZB1NaM+K79KKAwlr0GPXenZkHU1ozB+DyBJIE3qxh9/Me1Kq/x3taSafG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"/>
              </defs>
          </svg>

      </button>
    </h2>
    <div id="accordion-example-body-${i + 1}" class="hidden" aria-labelledby="accordion-example-heading-${i + 1}">
      <div class="p-5">
        <p class="mb-2">
        ${this.choiceList.map((x, i) => {
        return `
        <div class='flex items-center justify-between gap-4 mb-4'> 
        <div class='flex gap-2 items-center'>
          <div class='w-[30px] choice-icon'>
            ${x.icon} 
          </div>
          <div>${x.value === 'Overall Score' ? "Overall Score /100" : x.value}</div>
          </div>
          <div class='flex items-end justify-end'>${d[x.score]} </div> 
        </div>
`
      }).join('')}
        </p>
      </div>
    </div>`)

    const accordionElement = document.getElementById('accordion-example');
    // create an array of objects with the id, trigger element (eg. button), and the content element

    const accordionItems = data.map((d, i) => {
      return {
        id: `accordion-example-heading-${i + 1}`,
        triggerEl: document.querySelector(`#accordion-example-heading-${i + 1}`),
        targetEl: document.querySelector(`#accordion-example-body-${i + 1}`),
        active: false
      }
    })

    // options with default values
    const options = {
      alwaysOpen: true,
      activeClasses: 'bg-gray-100 dark:bg-transparent text-gray-900 dark:text-white',
      inactiveClasses: 'text-gray-500 dark:text-gray-400',
      onOpen: (item) => {
        console.log(item)
      },
      onClose: (item) => {

      },
      onToggle: (item) => {

      },
    };

    // instance options object
    const instanceOptions = {
      id: 'accordion-example',
      override: true
    };
    const accordion = new Accordion(accordionElement, accordionItems, options, instanceOptions);
  }

}


new App()