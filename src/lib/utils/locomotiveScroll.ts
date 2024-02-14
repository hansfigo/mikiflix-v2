import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default async function () {
	const module = await import('locomotive-scroll');
	const LocomotiveScroll = module.default;

	const container = document.querySelector('[data-scroll-container]') as HTMLElement | null;
	const locoScroll = container ? new LocomotiveScroll({ el: container, smooth: true }) : undefined;

	if (locoScroll) {
		locoScroll.on('scroll', ScrollTrigger.update);

		ScrollTrigger.scrollerProxy('[data-scroll-container]', {
			scrollTop(value) {
				return arguments.length
					? (locoScroll as any).scrollTo(value!, { duration: 0, disableLerp: true })
					: (locoScroll as any).scroll.instance.scroll.y;
			},
			getBoundingClientRect() {
				return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
			},
			// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
			pinType: (document.querySelector('[data-scroll-container]') as HTMLElement).style.transform
				? 'transform'
				: 'fixed'
		});

		ScrollTrigger.addEventListener('refresh', () => {
			locoScroll.update();
		});
		ScrollTrigger.defaults({ scroller: '[data-scroll-container]' });

		ScrollTrigger.refresh();
	}
}
