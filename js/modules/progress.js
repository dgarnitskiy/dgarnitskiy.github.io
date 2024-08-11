class ProgressCircle {
	circleRadius = 60
	circleLength = 2 * Math.PI * this.circleRadius

	constructor(targetId) {
		this.target = document.getElementById(targetId)
		this.progress = this.createProgress()
		this.progressIndicator = this.progress.getElementById('progress-indicator')
		this.rotateAnimation = this.progress.getElementById('rotate-animation')
		this.isHidden = false
		this.isAnimating = false
	}

	createProgress() {
		try {
			if (!this.target) {
				throw new Error('Target is not defined')
			}

			this.target.setAttribute('class', 'progress')

			const svgNS = 'http://www.w3.org/2000/svg'

			const svgEl = document.createElementNS(svgNS, 'svg')
			svgEl.setAttribute('class', 'progress__circles')
			svgEl.setAttribute('id', 'progress-circles')

			const circleBg = document.createElementNS(svgNS, 'circle')
			circleBg.setAttribute('class', 'progress__circle progress__circle_bg')
			circleBg.setAttribute('cx', '70')
			circleBg.setAttribute('cy', '70')

			const progressIndicator = document.createElementNS(svgNS, 'circle')
			progressIndicator.setAttribute(
				'class',
				'progress__circle progress__circle_indicator progress__circle_animate'
			)
			progressIndicator.setAttribute('id', 'progress-indicator')
			progressIndicator.setAttribute('cx', '70')
			progressIndicator.setAttribute('cy', '70')

			const animateTransform = document.createElementNS(
				svgNS,
				'animateTransform'
			)
			animateTransform.setAttribute('attributeName', 'transform')
			animateTransform.setAttribute('type', 'rotate')
			animateTransform.setAttribute('from', '0 70 70')
			animateTransform.setAttribute('to', '360 70 70')
			animateTransform.setAttribute('dur', '5s')
			animateTransform.setAttribute('begin', 'indefinite')
			animateTransform.setAttribute('restart', 'always')
			animateTransform.setAttribute('repeatCount', 'indefinite')
			animateTransform.setAttribute('id', 'rotate-animation')

			progressIndicator.appendChild(animateTransform)
			svgEl.appendChild(circleBg)
			svgEl.appendChild(progressIndicator)

			this.target.appendChild(svgEl)

			return svgEl
		} catch (error) {
			console.error(error)
		}
	}

	setValue(value) {
		value = Math.min(Math.max(value, 0), 100)
		const offset = this.circleLength - (value / 100) * this.circleLength
		this.progressIndicator.style.strokeDashoffset = offset
	}

	toggleAnimation() {
		if (!this.isAnimating) {
			this.rotateAnimation.beginElement()
		} else {
			this.rotateAnimation.endElement()
		}
		this.isAnimating = !this.isAnimating
	}

	toggleHide() {
		if (!this.isHidden) {
			this.target.classList.add('progress_hidden')
		} else {
			this.target.classList.remove('progress_hidden')
		}
		this.isHidden = !this.isHidden
	}
}

export default ProgressCircle
