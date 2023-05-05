import style from "./Wrapper.module.scss"

export const Wrapper = ({children}: any) => {
    return(
        <div className={style.wrapper}>
            {children}
        </div>
    )
}