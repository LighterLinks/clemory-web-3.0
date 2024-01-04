import Image from 'next/image'
// import logoImg from '../Images/logo_mono.png'
import logoImg from '../Images/logo_mono_stroke.png'

export default function ClemoryLogo({ size }: { size: number }) {
    return (
        <Image src={logoImg} alt="Clemory Logo" width={size} height={size} />
    )
}