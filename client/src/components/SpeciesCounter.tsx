interface Props {
    count: number
}

export default function SpeciesCounter({count}: Props) {
    return (
        <p className="counter">Species: {count}</p>
    )
}