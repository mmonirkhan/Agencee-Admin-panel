import { Button } from "antd"

type Props = {
    showSidebarToggleBtn?: boolean,
    onSidebarToggle: () => void
}

const Navbar = (props: Props) => {
    return (
        <nav className="bg-white shadow w-full h-14 px-4 flex items-center relative z-[1]">
            <div>
                {props.showSidebarToggleBtn && <Button type="primary" onClick={props.onSidebarToggle} icon={<i className="ri-menu-line"></i>}></Button>}
            </div>
        </nav>
    )
}

export default Navbar