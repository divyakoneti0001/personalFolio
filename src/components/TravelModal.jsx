import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './TravelModal.css'

const PIN = L.divIcon({
  className: '',
  html: '<div class="map-pin"><div class="map-pin__needle"></div></div>',
  iconSize: [20, 28],
  iconAnchor: [10, 28],
  popupAnchor: [0, -28],
})

function Itinerary({ days, accent }) {
  const [activeDay, setActiveDay] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const selectDay = (i) => {
    setActiveDay(i)
    setAnimKey(k => k + 1)
  }

  const current = days[activeDay]

  return (
    <div className="itin">

      {/* Day tab selector */}
      <div className="itin__tabs">
        {days.map((d, i) => (
          <button
            key={i}
            className={`itin__tab ${i === activeDay ? 'itin__tab--active' : ''}`}
            style={i === activeDay ? { borderColor: accent, color: accent, background: `${accent}18` } : {}}
            onClick={() => selectDay(i)}
          >
            <span className="itin__tab-num">Day {d.day}</span>
            <span className="itin__tab-title">{d.title}</span>
          </button>
        ))}
        {/* sliding accent underline */}
        <div
          className="itin__tab-indicator"
          style={{ left: `calc(${activeDay} * (100% / ${days.length}))`, width: `calc(100% / ${days.length})`, background: accent }}
        />
      </div>

      {/* Timeline */}
      <div className="itin__timeline" key={animKey}>
        {current.activities.map((act, i) => (
          <div key={i} className="itin__item" style={{ animationDelay: `${i * 0.08}s` }}>

            {/* Time badge */}
            <div className="itin__time">{act.time}</div>

            {/* Connector */}
            <div className="itin__connector">
              <div className="itin__dot" style={{ background: accent, boxShadow: `0 0 8px ${accent}88` }} />
              {i < current.activities.length - 1 && (
                <div className="itin__line" style={{ background: `linear-gradient(to bottom, ${accent}66, transparent)` }} />
              )}
            </div>

            {/* Card */}
            <div className="itin__card">
              <span className="itin__icon">{act.icon}</span>
              <div>
                <div className="itin__place">{act.place}</div>
                <div className="itin__desc">{act.desc}</div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

function PhotoCarousel({ images, name, year, accent }) {
  const [idx, setIdx] = useState(0)
  const touchX = useRef(null)
  const timerRef = useRef(null)

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIdx(i => (i + 1) % images.length)
    }, 3000)
  }

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [images.length])

  const prev = () => { setIdx(i => (i - 1 + images.length) % images.length); resetTimer() }
  const next = () => { setIdx(i => (i + 1) % images.length); resetTimer() }

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return
    const diff = touchX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev() }
    touchX.current = null
  }

  const getPos = (i) => {
    const total = images.length
    let d = ((i - idx + total) % total)
    if (d > total / 2) d -= total
    if (d === 0) return 'center'
    if (d === 1)  return 'right'
    if (d === -1) return 'left'
    return 'hidden'
  }

  return (
    <div className="carousel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      {images.map((src, i) => {
        const pos = getPos(i)
        return (
          <div
            key={i}
            className={`carousel__polaroid carousel__polaroid--${pos}`}
            onClick={pos === 'left' ? prev : pos === 'right' ? next : undefined}
          >
            <div className="carousel__polaroid-img">
              <img src={src} alt={`${name} ${i + 1}`} loading="lazy" />
            </div>
            <div className="carousel__polaroid-label">
              {pos === 'center' ? `${name} · ${year}` : ''}
            </div>
          </div>
        )
      })}

      <div className="carousel__counter" style={{ color: accent }}>
        {idx + 1} <span style={{ opacity: 0.4 }}>/</span> {images.length}
      </div>

      {images.length > 1 && (
        <>
          <button className="carousel__btn carousel__btn--prev" onClick={prev} aria-label="Previous">‹</button>
          <button className="carousel__btn carousel__btn--next" onClick={next} aria-label="Next">›</button>
        </>
      )}

      <div className="carousel__dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carousel__dot ${i === idx ? 'carousel__dot--active' : ''}`}
            style={i === idx ? { background: accent } : {}}
            onClick={() => { setIdx(i); resetTimer() }}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>

    </div>
  )
}

export default function TravelModal({ destination, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!destination) return null

  const { name, tag, desc, emoji, accent, mapCenter, mapZoom, pins, images, coords, year } = destination

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-glass" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-eyebrow">
            <span className="modal-tag-badge" style={{ color: accent, borderColor: `${accent}55` }}>
              {emoji}&nbsp;&nbsp;{tag}
            </span>
            <span className="modal-coords">{coords} · {year}</span>
          </div>
          <h1 className="modal-headline">{name}</h1>
          <p className="modal-desc-sub">{desc}</p>
        </div>

        <div className="modal-divider" style={{ '--divider-color': accent }} />

        {/* Body */}
        <div className="modal-body">

          {/* Map */}
          <div className="modal-map-wrap">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              scrollWheelZoom={false}
              zoomControl={false}
              className="modal-map"
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
              />
              <Polyline
                positions={pins.map(p => [p.lat, p.lng])}
                pathOptions={{
                  color: accent,
                  weight: 2,
                  opacity: 0.75,
                  dashArray: '6, 9',
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />
              {pins.map((pin) => (
                <Marker key={pin.name} position={[pin.lat, pin.lng]} icon={PIN}>
                  <Tooltip direction="top" offset={[0, -28]} opacity={1}>
                    {pin.name}
                  </Tooltip>
                  <Popup>{pin.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
            <div className="modal-map-label" style={{ '--label-accent': accent }}>
              📍 Explored Locations
            </div>
          </div>

          {/* Photo carousel */}
          <PhotoCarousel images={images} name={name} year={year} accent={accent} />

        </div>

        {/* Itinerary */}
        {destination.itinerary && (
          <>
            <div className="modal-divider" style={{ '--divider-color': accent }} />
            <div className="itin__heading">
              <span className="itin__heading-label" style={{ color: accent }}>Day-wise Itinerary</span>
            </div>
            <Itinerary days={destination.itinerary} accent={accent} />
          </>
        )}

      </div>
    </div>
  )
}
