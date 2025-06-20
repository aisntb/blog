import styles from "./ProfileBlock.module.css"
import MailIcon from "../../assets/email.svg"
import GitIcon from "../../assets/github.svg";

export default function ProfileBlock(){
    return(
    <div className={styles.container}>
            <div className={styles.avatar}>
                <img src="/avatar.jpg"/>
            </div>
            <div className={styles.profileInfo}>
                <div className={styles.profileTitle}>Seo Hayeon</div>
                <div className={styles.socialLinks}>
                    <a href="mailto:seohayeon.kr@gmail.com" className={styles.socialLink}>
                        <MailIcon style={{ fill: 'white' }} width={45}/>
                    </a>
                    <a href="https://github.com/aisntb" className={styles.socialLink}>
                        <GitIcon style={{ fill: 'white' }}/>
                    </a>
                </div>
            </div>
    </div>
    )
}