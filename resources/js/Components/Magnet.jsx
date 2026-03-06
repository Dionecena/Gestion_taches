import { useEffect, useRef } from 'react';

export default function Magnet({ children, strength = 18, className = '' }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const dx = Math.max(Math.min(x / (rect.width / 2), 1), -1) * strength;
            const dy = Math.max(Math.min(y / (rect.height / 2), 1), -1) * strength;

            el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        };

        const onLeave = () => {
            el.style.transform = 'translate3d(0px, 0px, 0)';
        };

        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);

        return () => {
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, [strength]);

    return (
        <div
            ref={ref}
            className={
                'inline-block transition-transform duration-200 ease-out will-change-transform ' +
                className
            }
        >
            {children}
        </div>
    );
}
