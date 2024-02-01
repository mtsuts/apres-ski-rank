class App {
	constructor() {
		this.loadDataAndInit()
	}

	// async loadDataAndInit() {
	// 	try {
	// 		const data = await d3.csv('./data/data.csv', d3.autoType)
	// 		this.choices = initDropdown({
	// 			list: data
	// 				.slice()
	// 				.sort((a, b) => {
	// 					return d3.ascending(a.Island, b.Island)
	// 				})
	// 				.map(d => ({
	// 					label: `<div class="flex items-center">
	// 					<img src="./images/flags/l/${d['Country Code']}.svg" class="mr-3 w-[20px] h-[15px]" /> 
	// 					${d.Island}
	// 				</div>`,
	// 					value: d.Island,
	// 				})),
	// 			id: '#islands_sel',
	// 			searchEnabled: true,
	// 			placeholder: 'Find locations',
	// 			searchPlaceholderValue: 'Search locations',
	// 			cb: island => this.highlightRow(island),
	// 		})
	// 		this.table = Table({
	// 			headers: getHeaders(data),
	// 			container: '#table',
	// 			data: data,
	// 			doneHeadersLoading: () => this.attachEventHandlers(),
	// 		}).render()
	// 	} catch (e) {
	// 		console.error(e)
	// 	}
	// }

	choiceList = [
		{
			text: 'Overall Score',
			icon: './images/icons/overall.svg'
		},
		{
			text: 'Avg. TripAdvisor score',
			icon: './images/icons/tripadvisor.svg'
		},
		{
			text: 'Instagram hashtags',
			icon: './images/icons/instagram.svg'
		},
		{
			text: 'Food and drink prices for a week',
			icon: './images/icons/food.svg'
		},
		{
			text: 'Ski pass price',
			icon: './images/icons/ski.svg'
		}
	]
	async loadDataAndInit() {
		try {
			const data = await d3.csv('./data/ski-data.csv', d3.autoType)
			this.choices = initDropdown({
				list: this.choiceList.slice().sort((a, b) => a - b).map(d => ({
					label: `<div class='flex items-center gap-4'> 
					<img src='${d.icon}' alt='${d.icon}' class='w-[30px] h-[30px]' />
					<div> ${d.text} </div>
					</div>`,
					value: d.text
				})),
				id: '#category_sel',
				searchEnabled: false,
				placeholder: ` <div class='flex gap-2'>Order by: <div class='font-bold' orderby-category> Overall Score </div> </div>`,
				searchPlaceholderValue: '',
				cb: text => { },
			})
			this.table = Table({
				headers: getHeaders(data),
				container: '#table',
				data: data,
				doneHeadersLoading: () => this.attachEventHandlers(),
			}).render()

		} catch (e) {

		}
	}
	attachEventHandlers() {
		d3.select('#show_values').on('change', e => {
			console.log(checked)
			const checked = e.target.checked
			this.table.toggleValues(checked)
		})
	}

	highlightRow(island) {
		this.table.highlightRow(d => d.Island === island)
	}
}

new App()
