import { useContext } from 'react';
import { useMergeProps } from '../hooks/Hooks';
import { PrimeReactContext } from '../api/Api';
import { DomHandler, ObjectUtils, classNames } from '../utils/Utils';
import { MeterGroupBase } from './MeterGroupBase';
import { useHandleStyle } from '../componentbase/ComponentBase';

export const MeterGroup = (inProps) => {
    const context = useContext(PrimeReactContext);
    const props = MeterGroupBase.getProps(inProps, context);
    const { values, min, max, orientation, labelPosition } = props;

    const mergeProps = useMergeProps();
    const { ptm, cx, isUnstyled } = MeterGroupBase.setMetaData({
        props,
        ...props.__parentMetadata,
        context: {
            disabled: props.disabled
        }
    });

    useHandleStyle(MeterGroupBase.css.styles, isUnstyled, { name: 'progressbar' });

    const totalPercent = values.reduce((acc, val) => acc + val.value, 0);

    const calculatePercentage = (meter = 0) => {
        const percentageOfItem = ((meter - min) / (max - min)) * 100;

        return Math.round(Math.max(0, Math.min(100, percentageOfItem)));
    };

    const rootProps = mergeProps(
        {
            className: classNames(props.className, cx('root', { orientation }))
        },
        MeterGroupBase.getOtherProps(props),
        ptm('root')
    );

    const createMeters = () => {
        const meters = values.map((item, index) => {
            const meterInlineStyles = {
                backgroundColor: item.color,
                width: orientation === 'horizontal' && calculatePercentage(item.value) + '%',
                height: orientation === 'vertical' && calculatePercentage(item.value) + '%'
            };

            const meterProps = mergeProps(
                {
                    className: cx('meter'),
                    style: meterInlineStyles
                },
                ptm('meter')
            );

            return <span key={index} {...meterProps} />;
        });

        const meterContainerProps = mergeProps(
            {
                className: cx('metercontainer')
            },
            ptm('metercontainer')
        );

        return <div {...meterContainerProps}>{meters}</div>;
    };

    const createLabelList = () => {
        const labelListProps = mergeProps(
            {
                className: cx('labellist')
            },
            ptm('labellist')
        );

        const labelItemProps = mergeProps(
            {
                className: cx('labellistitem')
            },
            ptm('labellistitem')
        );

        const labelProps = mergeProps(
            {
                className: cx('label')
            },
            ptm('label')
        );

        return (
            <ol {...labelListProps}>
                {values.map((item, index) => {
                    const labelIconProps = mergeProps(
                        {
                            className: classNames(cx('labelicon'), item.icon),
                            style: { color: item.color }
                        },
                        ptm('labelicon')
                    );

                    const labelListIconProps = mergeProps(
                        {
                            className: cx('labellisttype'),
                            style: { backgroundColor: item.color }
                        },
                        ptm('labellisttype')
                    );

                    const labelIcon = item.icon ? <i {...labelIconProps} /> : <span {...labelListIconProps} />;

                    return (
                        <li key={index} {...labelItemProps}>
                            {labelIcon}
                            <span {...labelProps}>
                                {item.label} ({item.value}%)
                            </span>
                        </li>
                    );
                })}
            </ol>
        );
    };

    return (
        <div {...rootProps} role="meter" aria-valuemin={min} aria-valuemax={max} aria-valuenow={totalPercent}>
            {labelPosition === 'start' && createLabelList()}
            {createMeters()}
            {labelPosition === 'end' && createLabelList()}
        </div>
    );
};
