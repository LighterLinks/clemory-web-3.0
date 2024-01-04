import Image from 'next/image'
import logoImg from '../Images/logo.png'
import logoSvg from '../Images/logo.svg'

export default function ClemoryLogoAlt({ size }: { size: number }) {
    return (
        <Image src={logoSvg} alt="Clemory Logo" width={size} height={size} />
    )
}