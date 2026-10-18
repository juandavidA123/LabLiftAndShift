(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
        return;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        return;
    }

    canvas.id = 'static-transition';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.width = Math.max(1, Math.ceil(window.innerWidth / 2));
    canvas.height = Math.max(1, Math.ceil(window.innerHeight / 2));
    document.body.appendChild(canvas);

    const frame = context.createImageData(canvas.width, canvas.height);
    let animationFrame;
    let fadeTimeout;

    function drawNoise() {
        for (let index = 0; index < frame.data.length; index += 4) {
            const shade = Math.floor(Math.random() * 256);
            frame.data[index] = shade;
            frame.data[index + 1] = shade;
            frame.data[index + 2] = shade;
            frame.data[index + 3] = 255;
        }

        context.putImageData(frame, 0, 0);
        animationFrame = window.requestAnimationFrame(drawNoise);
    }

    function stopNoise() {
        window.cancelAnimationFrame(animationFrame);
    }

    drawNoise();
    window.requestAnimationFrame(() => {
        canvas.classList.add('is-hidden');
    });
    fadeTimeout = window.setTimeout(stopNoise, 320);

    document.addEventListener('click', (event) => {
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        const link = event.target.closest('a');

        if (!link || link.target || link.hasAttribute('download')) {
            return;
        }

        const destination = new URL(link.href, window.location.href);
        const current = new URL(window.location.href);

        if (
            destination.origin !== current.origin ||
            (destination.pathname === current.pathname &&
                destination.search === current.search)
        ) {
            return;
        }

        event.preventDefault();
        window.clearTimeout(fadeTimeout);
        window.cancelAnimationFrame(animationFrame);
        canvas.classList.add('is-transitioning');
        canvas.classList.remove('is-hidden');
        drawNoise();
        window.setTimeout(() => {
            window.location.href = destination.href;
        }, 400);
    });
})();
