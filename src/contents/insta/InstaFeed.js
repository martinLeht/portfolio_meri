import  { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import InstaPost from './InstaPost';
import InstagramService from '../../services/InstagramService';
import HelmetMetaData from '../../components/general/HelmetMetaData';
import Loader from '../../components/general/Loader';
import SectionSeparator from '../../components/general/SectionSeparator';
import ImageViewer from '../../components/general/ImageViewer';

const InstaFeed = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageViewerIndex, setImageViewerIndex] = useState(0);
    const [viewerOpen, setViewerOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchInstagramPosts = async () => {
            setLoading(true);
            const instagramService = new InstagramService();
            instagramService.fetchInstaPosts().then(posts => {
                setPosts(posts);
                setLoading(false);
            }).catch(err => {
                console.error(err.message);
                setLoading(false);
            });
        }
        fetchInstagramPosts();
    }, []);

    const openImageViewerAction = (imgIndex) => {
        setImageViewerIndex(imgIndex);
        setViewerOpen(true);
    }

    const closeImageViewer = () => {
        setViewerOpen(false);
    }

    return (
        <>
            <HelmetMetaData
                title={t('insta.feed.title')}
            />
            <div className="p-4">
                <SectionSeparator title={t('insta.feed.title')} />
                <div className="d-flex align-items-center justify-content-center ig-container">
                    
                    <div className="mdb-lightbox no-margin p-1 ig-posts">
                        <MDBRow center>
                            { loading && <Loader pulse /> }
                            {
                                !!posts && (
                                    posts.map(({
                                        id,
                                        media_type,
                                        caption,
                                        media_url,
                                        permalink}, i) => {
                                        return (
                                            <MDBCol md="4" key={ i }>
                                                <InstaPost
                                                    id={ id } 
                                                    src={ media_url } 
                                                    instaLink={ permalink }
                                                    caption={ caption }
                                                    mediaType={ media_type }
                                                    openAction={ () => openImageViewerAction(i) }
                                                />
                                            </MDBCol>
                                        );
                                    })
                                )
                            }
                        </MDBRow>
                    </div>

                    { !loading && viewerOpen && posts.length > 0 && (
                        <ImageViewer 
                            images={ posts.map(post => { return { mediaUrl: post.media_url }})} 
                            openAtIndex={ imageViewerIndex } 
                            onCloseAction={ closeImageViewer } 
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default InstaFeed;