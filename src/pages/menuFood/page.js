import SelectMenu from "../menuFood/components/selectMenu.js";

export default function MenuFood() {
    return (
        <div className="pt-28 max-w-[1200px] m-auto">
            <p className="text-CollorSecondaryDefault uppercase tracking-wide text-center font-semibold">Cardápio</p>
            <h1 className="text-CollorDefault   text-center font-bold text-3xl">Nosso Cardápio</h1>
            <SelectMenu />
        </div>
    )
}