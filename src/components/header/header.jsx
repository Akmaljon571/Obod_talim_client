import './header.scss'

function Header() {
    const today = new Date();
    const month = String(today.getMonth() + 1);
    const year = today.getFullYear();
    const date = String(today.getDate());
    return (
        <header className="header">
            <div className="xisobot_box">
                <h2 className="xisobot_box_h2">O‘qituvchilar</h2>
                <p className="xisobot_box_date">
                    {date.length === 1 ? "0" + date : date}.
                    {month.length === 1 ? "0" + month : month}.{year}
                </p>
                <button className="xisobot_box_btn">Log out</button>
            </div>
        </header>
    )
}

export default Header