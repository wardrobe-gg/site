export function LegalHeading({children}) {
    return (
        <h3 class="text-3xl font-bold uppercase my-4">{children}</h3>
    )
}

export function LegalSubheading({children}) {
    return (
        <h4 class="text-xl font-bold uppercase my-1">{children}</h4>
    )
}

export function LegalInfo({ children }) {
    return (
        <i>{children}</i>
    ) 
}

export function LegalLink({ children, to }) {
    const target = to.charAt(0) === '#' ? '_self' : '_blank'
    return (
        <a  href={to} target={target} className="font-bold underline underline-offset-4 italic">{children}</a>
    )
}

export function LegalBold({ children }) {
    return (
        <span className="font-bold">{children}</span>
    )
}

