const Header = (props) => {

    return(
        <div className = 'header'>
            <div className="row p-3">
                <div className="col-3">
                    <h2>NOTES.AI</h2>
                </div>
                <div className="col-8 text-right header-icons">
                    <i className = 'ri-home-3-line' onClick={() => {
                        props.toggleShowFavorites(false)
                    }}></i>                    
                    <i className = 'ri-heart-fill' onClick={() => {
                        props.toggleShowFavorites(true)
                    }}></i>
                    {!props.noteState ? <i className = 'ri-add-line' onClick = {props.showAddForm}></i> : " " }
                </div>
            </div>
        </div>
    )

}

export default Header