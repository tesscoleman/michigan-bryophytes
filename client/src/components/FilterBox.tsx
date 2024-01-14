interface Props {
    name: string,
    currentClasses: string,
    onClick: () => void,
}

export default function FilterBox({name, currentClasses, onClick} : Props) {
    const classes = currentClasses.split(',');
    const color = classes.includes(name) ? 'rgb(var(--' + name + '-color, #fff), 1)':'rgb(var(--' + name + '-color, #fff), 0.5)';
    // TO DO: make dynamic
    const isInactive = (name === "Takakiopsida" || name === "Andreaeobryopsida" || name === "Oedipodiopsida");
    
    return (
        <a onClick={onClick} className={`filter counter ${isInactive && "inactive-filter"}`} style={{backgroundColor: color}}>{name}</a>
    )
}