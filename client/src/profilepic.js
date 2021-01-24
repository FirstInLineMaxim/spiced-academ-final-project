export default function ProfilePic({ first, last, image, toggleUploader }) {
    return (
        <>
            <div className="img-wrapper">
                <img
                    onClick={() => toggleUploader()}
                    className="profile-img"
                    src={image || "../default-img.png"}
                    alt={`${first} ${last}`}
                />
            </div>
        </>
    );
}
