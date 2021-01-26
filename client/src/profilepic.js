export default function ProfilePic({ first, last, profile_pic, toggleUploader }) {
    return (
        <>
            <div className="img-wrapper">
                <img
                    onClick={() => toggleUploader()}
                    className="profile-img"
                    src={profile_pic || "../default-img.png"}
                    alt={`${first} ${last}`}
                />
            </div>
        </>
    );
}
