import PageLayout from "../../components/page-layout/page-layout.tsx";
import ProfileNavigation from "../../components/profile/profile-navigation/profile-navigation.tsx";
import styles from "./profile-page.module.css";
import {Outlet} from "react-router-dom";


const ProfilePage = () => {
    return (
        <PageLayout>
            <div className={styles.wrapper}>
                <ProfileNavigation/>

                <Outlet/>
            </div>
        </PageLayout>
    );
};


export default ProfilePage;
