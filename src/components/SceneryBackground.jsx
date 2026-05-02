import { useRef, useEffect } from 'react'
import './SceneryBackground.css'

// Deterministic star field via box-shadow on a 1px element
function buildStarField(count, seed, maxY) {
  let s = seed
  const rng = () => { s = (s * 1664525 + 1013904223) & 0x7fffffff; return s / 0x7fffffff }
  const shadows = []
  for (let i = 0; i < count; i++) {
    const x = Math.round(rng() * 1600)
    const y = Math.round(rng() * maxY)
    const op = (0.35 + rng() * 0.65).toFixed(2)
    shadows.push(`${x}px ${y}px 0px rgba(255,255,255,${op})`)
  }
  return shadows.join(',')
}

// Small dim stars (many), brighter stars (fewer, with glow spread)
const STARS_SM = buildStarField(200, 11111, 1400)
const STARS_LG = buildStarField(55,  33333, 1400)

export default function SceneryBackground() {
  const starsRef     = useRef(null)
  const landscapeRef = useRef(null)
  const mtsFarRef    = useRef(null)
  const mtsMidRef    = useRef(null)
  const hillsRef     = useRef(null)
  const mtsNear1Ref  = useRef(null)
  const mtsNear2Ref  = useRef(null)
  const treesRef     = useRef(null)

  useEffect(() => {
    let raf = null

    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const p  = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0
      const sy = window.scrollY


      // ── Stars: slow parallax upward — feel distant behind the aurora ────
      if (starsRef.current)
        starsRef.current.style.transform = `translateY(${-sy * 0.12}px) translateZ(0)`

      // ── Horizontal drift — far layers slow, near layers fast ─────────────
      const dx = (speed, cap) =>
        `translateX(${-Math.min(sy * speed, cap)}px) translateZ(0)`

      if (mtsFarRef.current)   mtsFarRef.current.style.transform   = dx(0.012, 45)
      if (mtsMidRef.current)   mtsMidRef.current.style.transform   = dx(0.028, 62)
      if (hillsRef.current)    hillsRef.current.style.transform    = dx(0.05,  80)
      if (mtsNear1Ref.current) mtsNear1Ref.current.style.transform = dx(0.06,  88)
      if (mtsNear2Ref.current) mtsNear2Ref.current.style.transform = dx(0.07,  94)
      if (treesRef.current)    treesRef.current.style.transform    = dx(0.08,  100)

      raf = null
    }

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); raf && cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="scene" aria-hidden="true">

      {/* Deep arctic midnight base */}
      <div className="scene__sky scene__sky--night" />

      {/* Star field — two layers for depth */}
      <div ref={starsRef} className="scene__stars" aria-hidden="true">
        <div className="scene__stars-sm" style={{ boxShadow: STARS_SM }} />
        <div className="scene__stars-lg" style={{ boxShadow: STARS_LG }} />
      </div>

      {/* Aurora Borealis bands — pure CSS animated */}
      <div className="scene__aurora">
        <div className="scene__aurora-band scene__aurora-band--1" />
        <div className="scene__aurora-band scene__aurora-band--2" />
        <div className="scene__aurora-band scene__aurora-band--3" />
        <div className="scene__aurora-band scene__aurora-band--4" />
      </div>

      {/* Static dark base — keeps sky from bleeding through landscape */}
      <div className="scene__base-cover" />

      {/* Landscape group — opacity fade only, each layer drifts independently */}
      <div ref={landscapeRef} className="scene__landscape">

        {/* Mountains — far (hazy) */}
        <svg ref={mtsFarRef} className="scene__layer scene__mts-far"
             viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#1a5068" stopOpacity="0.5"  />
              <stop offset="100%" stopColor="#082030" stopOpacity="0.92" />
            </linearGradient>
          </defs>
          <path fill="url(#gFar)" d="
            M-10,310
            C 55,268  115,244  185,256
            C 255,268  310,238  385,244
            C 460,250  505,216  580,224
            C 655,232  700,200  778,208
            C 856,216  900,182  978,190
            C1056,198 1100,168 1178,176
            C1256,184 1310,206 1380,200
            C1420,196 1445,212 1450,210
            L1450,400 L-10,400 Z" />
        </svg>

        {/* Mountains — mid */}
        <svg ref={mtsMidRef} className="scene__layer scene__mts-mid"
             viewBox="0 0 1440 440" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gMid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0d3850" stopOpacity="0.9"  />
              <stop offset="100%" stopColor="#061420" stopOpacity="1"    />
            </linearGradient>
          </defs>
          <path fill="url(#gMid)" d="
            M-10,345
            C 40,304  90,278  148,292
            C 206,306  256,272  326,280
            C 396,288  440,250  514,260
            C 588,270  630,234  706,244
            C 782,254  825,218  902,228
            C 979,238 1022,202 1098,212
            C1174,222 1230,248 1302,240
            C1370,233 1420,255 1450,252
            L1450,440 L-10,440 Z" />
        </svg>

        {/* Hills — near */}
        <svg ref={hillsRef} className="scene__layer scene__hills"
             viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gHill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#082030" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#030c14" stopOpacity="1"    />
            </linearGradient>
          </defs>
          <path fill="url(#gHill)" d="
            M-10,255
            C 70,214  148,190  238,204
            C 328,218  398,188  488,196
            C 578,204  648,176  738,184
            C 828,192  898,166  990,174
            C1082,182 1152,202 1240,196
            C1328,190 1400,210 1450,208
            L1450,360 L-10,360 Z" />
        </svg>

        {/* Mountains — near-1 */}
        <svg ref={mtsNear1Ref} className="scene__layer scene__mts-near1"
             viewBox="0 0 1440 280" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gNear1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0a1e2e" stopOpacity="1" />
              <stop offset="100%" stopColor="#020c18" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path fill="url(#gNear1)" d="
            M-10,280 L-10,228
            C  30,218  60,198  105,180
            C 150,162  178,185 228,178
            C 278,171  308,138 358,126
            C 408,114  438,142 490,150
            C 542,158  568,125 622,115
            C 676,105  704,132 760,140
            C 816,148  843,115 900,107
            C 957, 99  984,125 1040,133
            C1096,141 1122,112 1178,104
            C1234, 96 1272,122 1325,138
            C1368,150 1410,188 1450,205
            L1450,280 Z" />
        </svg>

        {/* Mountains — near-2 */}
        <svg ref={mtsNear2Ref} className="scene__layer scene__mts-near2"
             viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gNear2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0a1a28" stopOpacity="1" />
              <stop offset="100%" stopColor="#020a14" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path fill="url(#gNear2)" d="
            M-10,240 L-10,195
            C  28,182  58,165  98,150
            C 138,135  162,158 208,150
            C 254,142  280,110 326, 98
            C 372, 86  398,112 446,120
            C 494,128  518, 96 566, 86
            C 614, 76  640,102 690,110
            C 740,118  764, 88 814, 78
            C 864, 68  890, 94 940,102
            C 990,110 1014, 80 1064, 72
            C1114, 64 1140, 90 1190, 98
            C1240,106 1278, 85 1325, 96
            C1368,106 1410,145 1450,165
            L1450,240 Z" />
        </svg>

        {/* Mountains — near (foreground) */}
        <svg ref={treesRef} className="scene__layer scene__trees"
             viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gNear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0d2535" stopOpacity="1" />
              <stop offset="100%" stopColor="#020a10" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path fill="url(#gNear)" d="
            M-10,200 L-10,162
            C  25,152  52,138  88,120
            C 124,102  148,125 192,118
            C 236,111  262, 80 304, 70
            C 346, 60  370, 86 414, 93
            C 458,100  482, 68 526, 58
            C 570, 48  594, 74 638, 80
            C 682, 86  706, 56 750, 48
            C 794, 40  818, 64 862, 71
            C 906, 78  930, 50 974, 42
            C1018, 34 1042, 58 1086, 65
            C1130, 72 1154, 46 1198, 40
            C1242, 34 1280, 56 1324, 68
            C1360, 78 1404,116 1450,138
            L1450,200 Z" />
        </svg>

        {/* Ground strip */}
        <div className="scene__ground" />

      </div>{/* end scene__landscape */}
    </div>
  )
}
