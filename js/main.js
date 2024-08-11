import ProgressCircle from './modules/progress.js'

const progress = new ProgressCircle('progress')

document.addEventListener('DOMContentLoaded', () => {
	const actionsValue = document.getElementById('actions-value')
	const actionsAnimate = document.getElementById('actions-animate')
	const actionsHide = document.getElementById('actions-hide')

	actionsValue.addEventListener('change', event => {
		progress.setValue(event.target.value)
	})
	actionsAnimate.addEventListener('change', () => {
		if (actionsHide.checked) {
			actionsHide.checked = false
			progress.toggleHide()
		}
		progress.toggleAnimation()
	})
	actionsHide.addEventListener('change', () => {
		if (actionsAnimate.checked) {
			actionsAnimate.checked = false
			progress.toggleAnimation()
		}
		progress.toggleHide()
	})

	progress.setValue(actionsValue.value)
})
