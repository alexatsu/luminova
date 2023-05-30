import cl from "@styles/components/Burger.module.scss"

interface IBurgerProps {
    handleClick: (open: boolean) => void
}

export const Burger = ({handleClick}: IBurgerProps) => {
    return (
        <div 
            role="button"
            className={cl.burger}
            onClick={handleClick}
            >
            <span className={cl.burgerLine}></span>
            <span className={cl.burgerLine}></span>
            <span className={cl.burgerLine}></span>
        </div>
    )
}
