import { useEffect, useRef } from 'react';
import type { Map as YMap, Placemark } from 'yandex-maps';
import ymaps from 'yandex-maps';

declare global {
  interface Window {
    ymaps: typeof ymaps;
  }
}

const YandexMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.type = 'text/javascript';

    script.onload = () => {
      window.ymaps.ready(() => {
        const coords: [number, number] = [56.837144, 60.615658]; // Екатеринбург, Малышева 164

        const map: YMap = new window.ymaps.Map(mapRef.current as HTMLElement, {
          center: coords,
          zoom: 15, 
          controls: ['zoomControl', 'fullscreenControl'],
        });

        const placemark: Placemark = new window.ymaps.Placemark(
          coords,
          {
            hintContent: 'ООО "ТД УЭТ"',
            balloonContent: '<strong>ООО "ТД УЭТ"</strong><br/>г. Екатеринбург, ул. Малышева, 164',
          },
          {
            preset: 'islands#redIcon',
            openBalloonOnClick: true,
          }
        );

        map.geoObjects.add(placemark);
        placemark.balloon.open();
      });
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <h2 className="contacts-page__subtitle">Карта расположения офиса</h2>
      <div
        className="contacts-page__map"
        ref={mapRef}
      ></div>
    </div>
  );
};

export default YandexMap;
