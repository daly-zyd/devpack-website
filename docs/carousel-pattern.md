Carousel pattern (useAutoCarousel hook)

The project includes a reusable hook `src/hooks/useAutoCarousel.js` which encapsulates autoplay, pause, keyboard navigation and reduced-motion handling.

Usage example (in any page/component):

```jsx
import useAutoCarousel from '../hooks/useAutoCarousel';

function MyCarousel({ items }){
  const { index, setIsPaused, setIndex, prev, next, isPaused } = useAutoCarousel(items.length, { delay: 3000 });

  return (
    <div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <button onClick={prev}>Prev</button>
      <img src={items[index]} alt="" />
      <button onClick={next}>Next</button>
    </div>
  );
}
```

This lets you apply the same carousel behavior on `About.jsx` or other pages quickly.
