import { Film, Maximize2, Play, Search, Settings, Volume2, X } from 'lucide-react'
import { useState } from 'react'
import videoPreview from '../../../assets/images/student-flow/video-resources-details.webp'

type VideoResourcesModalProps = { onClose: () => void }

const videoName = 'Fundamentals of Advanced Database Systems.mp4'

export default function VideoResourcesModal({ onClose }: VideoResourcesModalProps) {
    const [selectedVideo, setSelectedVideo] = useState(false)

    const openVideo = () => setSelectedVideo(true)
    const card = (preview: 'available' | 'unavailable', key: string) => <button className="student-video-card" type="button" onClick={openVideo} key={key}>
        <span className={`student-video-card__preview${preview === 'available' ? ' is-image' : ''}`} style={preview === 'available' ? { backgroundImage: `url(${videoPreview})` } : undefined}>{preview === 'available' ? <Play size={22} fill="currentColor" /> : <Film size={35} />}{preview === 'unavailable' && <small>Preview Unavailable</small>}</span>
        <b>{videoName}</b><small>5 May 2025 11.00AM</small>
    </button>

    return <div className="student-video-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
        {!selectedVideo ? <section className="student-video-modal" role="dialog" aria-modal="true" aria-labelledby="videos-modal-title">
            <header><span><Film size={16} /><strong id="videos-modal-title">Videos</strong></span><button type="button" aria-label="Close videos" onClick={onClose}><X size={20} /></button></header>
            <label className="student-video-modal__search"><Search size={17} /><input placeholder="Search" aria-label="Search videos" /><span>☷</span></label>
            <div className="student-video-modal__group"><h3>Today</h3>{card('unavailable', 'today')}</div>
            <div className="student-video-modal__group"><h3>Yesterday</h3>{card('available', 'yesterday')}</div>
            <div className="student-video-modal__group"><h3>Last 7 Days</h3><div className="student-video-modal__grid">{[1, 2, 3, 4, 5].map(item => card('unavailable', `last-${item}`))}</div></div>
        </section> : <section className="student-video-detail" role="dialog" aria-modal="true" aria-labelledby="video-detail-title">
            <header><div><span><Film size={15} /> Videos <b>›</b> {videoName}</span><h1 id="video-detail-title">Fundamentals of Advance Database Systems</h1><small>12 Jan 2025 11.59 PM</small></div><button type="button" aria-label="Close video" onClick={onClose}><X size={20} /></button></header>
            <div className="student-video-player"><img src={videoPreview} alt="Video lesson preview" /><div className="student-video-player__shade" /><button className="student-video-player__play" type="button" aria-label="Play video"><Play size={30} fill="currentColor" /></button><div className="student-video-player__controls"><button type="button" aria-label="Play video"><Play size={19} fill="currentColor" /></button><Volume2 size={18} /><span className="student-video-player__time">0.01 / 47.39&nbsp; • &nbsp;Intro</span><span className="student-video-player__progress"><i /></span><button type="button" aria-label="Video settings"><Settings size={18} /></button><button type="button" aria-label="Fullscreen"><Maximize2 size={18} /></button></div></div>
        </section>}
    </div>
}
