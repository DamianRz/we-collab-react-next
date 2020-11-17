import React, { useContext, Fragment, ReactElement, ReactChild } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useWindowSize } from '../../../hooks/useWindowSize';
import '../../../styles/theme.scss';
import './container-page.scss';

export const ContainerPage = (props: {
    title: string,
    info: string,
    img: string | ReactChild,
    imgFooter?: ReactChild,
    key?: number,
    align: 'left' | 'right',
    className?: string,
    imgClassName?: string,
    theme?: 'dark' | 'light'
}) => {
    const screenSize = useWindowSize();
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const InfoBox = () => {
        return (
            <div className="info-box">
                <p className={`title`}>{props.title}</p>
                {
                    props.info.split('\n').map((line, i) => {
                        return <p key={i} className={`text info text-${getTheme()}`}>{line}</p>
                    })
                }
            </div>
        );
    }

    const ImageBox = () => {
        return (
            <div className={`img-box ${props.imgClassName}`}>
                <div className="image">
                    {typeof (props.img) === 'string' ? (
                        <Fragment>
                            <img style={
                                (screenSize.size.width > 1100 ?
                                    ({ width: `${(screenSize.size.width - 520) / 2}px` })
                                    : null)}
                                src={props.img} />
                            {props.imgFooter ? (
                                <div className="image-footer">
                                    {props.imgFooter}
                                </div>
                            ) : null}
                        </Fragment>
                    ) : (
                            props.img
                        )}
                </div>
            </div>
        );
    }

    const LeftContentBox = () => {
        return (
            <Fragment>
                {InfoBox()}
                {ImageBox()}
            </Fragment>
        )
    }

    const RightContentBox = () => {
        return (
            <Fragment>
                {ImageBox()}
                {InfoBox()}
            </Fragment>
        )
    }

    return (
        <div key={props.key} className={`container-page-box ${props.className} ${props.theme ? ' ' + props.theme : ''}`}>
            <div className={`container`}>
                <div className={`content-box`}>
                    <div className={props.align}>
                        {props.align === 'left' ?
                            (LeftContentBox()) :
                            (RightContentBox())}
                    </div>
                </div>
            </div>
        </div>
    )
}