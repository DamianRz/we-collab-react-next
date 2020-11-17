import Reactm, { useEffect } from 'react';
import { Loader } from '../loader/loader';
import './loader-page.scss';

export const LoaderPage = (props: {
    show: boolean
}) => {
    const showLoader = () => {
        if (props.show) {
            return (
                <div className="loader_page">
                    <div className="loader-box">
                        <Loader />
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
    return showLoader();
}