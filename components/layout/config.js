import React, { useEffect, useState } from 'react';
import { Button } from '../lib/button/Button';
import { InputSwitch } from '../lib/inputswitch/InputSwitch';
import { RadioButton } from '../lib/radiobutton/RadioButton';
import { Sidebar } from '../lib/sidebar/Sidebar';
import { classNames } from '../lib/utils/ClassNames';

export default function Config(props) {
    const [scale, setScale] = useState(14);
    const [scales, setScales] = useState([12, 13, 14, 15, 16]);

    const onThemeChange = (theme, dark) => {
        props.onThemeChange({ theme, dark });
    };

    const decrementScale = () => {
        setScale((prevScale) => --prevScale);
    };

    const incrementScale = () => {
        setScale((prevScale) => ++prevScale);
    };

    useEffect(() => {
        document.documentElement.style.fontSize = scale + 'px';
    }, [scale]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Sidebar visible={props.active} onHide={() => props.onHide()} className="layout-config w-full sm:w-30rem" position="right">
            <div className="layout-config-content">
                <div>
                    <h4>Component Scale</h4>
                    <div className="config-scale">
                        <Button icon="pi pi-minus" onClick={decrementScale} className="p-button-text" disabled={scale === scales[0]} />
                        {scales.map((s) => {
                            return <i className={classNames('pi pi-circle-fill', { 'scale-active': s === scale })} key={s} />;
                        })}
                        <Button icon="pi pi-plus" onClick={incrementScale} className="p-button-text" disabled={scale === scales[scales.length - 1]} />
                    </div>

                    <div className="app-inputstyleswitch">
                        <h4>Input Style</h4>
                        <div className="formgroup-inline">
                            <div className="field-radiobutton">
                                <RadioButton inputId="inputstyle_outlined" name="inputstyle" value="outlined" onChange={() => props.onInputStyleChange('outlined')} checked={props.inputStyle === 'outlined'} />
                                <label htmlFor="inputstyle_outlined">Outlined</label>
                            </div>
                            <div className="field-radiobutton">
                                <RadioButton inputId="inputstyle_filled" name="inputstyle" value="filled" onChange={() => props.onInputStyleChange('filled')} checked={props.inputStyle === 'filled'} />
                                <label htmlFor="inputstyle_filled">Filled</label>
                            </div>
                        </div>
                    </div>

                    <h4>Ripple Effect</h4>
                    <InputSwitch checked={props.ripple} onChange={(e) => props.onRippleChange(e.value)} />

                    <h4>Free Themes</h4>
                    <p>
                        Built-in component themes created by the <a href="https://www.primefaces.org/designer/primereact">PrimeReact Theme Designer</a>.
                    </p>

                    <h5>Bootstrap</h5>
                    <div className="grid free-themes">
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('bootstrap4-light-blue')}>
                                <img src={`https://www.primereact.org/images/themes/bootstrap4-light-blue.svg`} alt="Bootstrap Light Blue" />
                            </button>
                            <span>Blue</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('bootstrap4-light-purple')}>
                                <img src={`https://www.primereact.org/images/themes/bootstrap4-light-purple.svg`} alt="Bootstrap Light Blue" />
                            </button>
                            <span>Purple</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('bootstrap4-dark-blue', true)}>
                                <img src={`https://www.primereact.org/images/themes/bootstrap4-dark-blue.svg`} alt="Bootstrap Dark Blue" />
                            </button>
                            <span>Blue</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('bootstrap4-dark-purple', true)}>
                                <img src={`https://www.primereact.org/images/themes/bootstrap4-dark-purple.svg`} alt="Bootstrap Dark Blue" />
                            </button>
                            <span>Purple</span>
                        </div>
                    </div>

                    <h5>Material Design</h5>
                    <div className="grid free-themes">
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('md-light-indigo')}>
                                <img src={`https://www.primereact.org/images/themes/md-light-indigo.svg`} alt="Material Light Indigo" />
                            </button>
                            <span>Indigo</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('md-light-deeppurple')}>
                                <img src={`https://www.primereact.org/images/themes/md-light-deeppurple.svg`} alt="Material Light Deep Purple" />
                            </button>
                            <span>Deep Purple</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('md-dark-indigo', true)}>
                                <img src={`https://www.primereact.org/images/themes/md-dark-indigo.svg`} alt="Material Dark Indigo" />
                            </button>
                            <span>Indigo</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('md-dark-deeppurple', true)}>
                                <img src={`https://www.primereact.org/images/themes/md-dark-deeppurple.svg`} alt="Material Dark Deep Purple" />
                            </button>
                            <span>Deep Purple</span>
                        </div>
                    </div>

                    <h5>Material Design Compact</h5>
                    <div className="grid free-themes">
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('mdc-light-indigo')}>
                                <img src={`https://www.primereact.org/images/themes/md-light-indigo.svg`} alt="Material Compact Light Indigo" />
                            </button>
                            <span>Indigo</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('mdc-light-deeppurple')}>
                                <img src={`https://www.primereact.org/images/themes/md-light-deeppurple.svg`} alt="Material Compact Deep Purple" />
                            </button>
                            <span>Deep Purple</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('mdc-dark-indigo', true)}>
                                <img src={`https://www.primereact.org/images/themes/md-dark-indigo.svg`} alt="Material Compact Dark Indigo" />
                            </button>
                            <span>Indigo</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('mdc-dark-deeppurple', true)}>
                                <img src={`https://www.primereact.org/images/themes/md-dark-deeppurple.svg`} alt="Material Compact Dark Deep Purple" />
                            </button>
                            <span>Deep Purple</span>
                        </div>
                    </div>

                    <h5>Tailwind</h5>
                    <div className="grid free-themes">
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('tailwind-light')}>
                                <img src={`https://www.primereact.org/images/themes/tailwind-light.png`} alt="Tailwind Light" />
                            </button>
                            <span>Tailwind Light</span>
                        </div>
                    </div>

                    <h5>Fluent UI</h5>
                    <div className="grid free-themes">
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('fluent-light')}>
                                <img src={`https://www.primereact.org/images/themes/fluent-light.png`} alt="Fluent Light" />
                            </button>
                            <span>Blue</span>
                        </div>
                    </div>

                    <h5>PrimeOne Design</h5>
                    <div className="grid free-themes">
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('lara-light-indigo')}>
                                <img src={`https://www.primereact.org/images/themes/lara-light-indigo.png`} alt="Lara Light Indigo" />
                            </button>
                            <span>Lara Indigo</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('lara-light-blue')}>
                                <img src={`https://www.primereact.org/images/themes/lara-light-blue.png`} alt="Lara Light Blue" />
                            </button>
                            <span>Lara Blue</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('lara-light-purple')}>
                                <img src={`https://www.primereact.org/images/themes/lara-light-purple.png`} alt="Lara Light Purple" />
                            </button>
                            <span>Lara Purple</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('lara-light-teal')}>
                                <img src={`https://www.primereact.org/images/themes/lara-light-teal.png`} alt="Lara Light Teal" />
                            </button>
                            <span>Lara Teal</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('lara-dark-indigo', true)}>
                                <img src={`https://www.primereact.org/images/themes/lara-dark-indigo.png`} alt="Lara Dark Indigo" />
                            </button>
                            <span>Lara Indigo</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('lara-dark-blue', true)}>
                                <img src={`https://www.primereact.org/images/themes/lara-dark-blue.png`} alt="Lara Dark Blue" />
                            </button>
                            <span>Lara Blue</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('lara-dark-purple', true)}>
                                <img src={`https://www.primereact.org/images/themes/lara-dark-purple.png`} alt="Lara Dark Purple" />
                            </button>
                            <span>Lara Purple</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('lara-dark-teal', true)}>
                                <img src={`https://www.primereact.org/images/themes/lara-dark-teal.png`} alt="Lara Dark Teal" />
                            </button>
                            <span>Lara Teal</span>
                        </div>
                    </div>

                    <h5>Misc</h5>
                    <div className="grid free-themes">
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('soho-light')}>
                                <img src={`https://www.primereact.org/images/themes/soho-light.png`} alt="Soho Light" />
                            </button>
                            <span>Soho Light</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('soho-dark', true)}>
                                <img src={`https://www.primereact.org/images/themes/soho-dark.png`} alt="Soho Dark" />
                            </button>
                            <span>Soho Dark</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('viva-light')}>
                                <img src={`https://www.primereact.org/images/themes/viva-light.svg`} alt="Viva Light" />
                            </button>
                            <span>Viva Light</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('viva-dark', true)}>
                                <img src={`https://www.primereact.org/images/themes/viva-dark.svg`} alt="Viva Dark" />
                            </button>
                            <span>Viva Dark</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('mira')}>
                                <img src={`https://www.primereact.org/images/themes/mira.jpg`} alt="Mira" />
                            </button>
                            <span>Mira</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('nano')}>
                                <img src={`https://www.primereact.org/images/themes/nano.jpg`} alt="Nano" />
                            </button>
                            <span>Nano</span>
                        </div>
                    </div>

                    <h5>PrimeOne Design - Legacy</h5>
                    <div className="grid free-themes">
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('saga-blue')}>
                                <img src={`https://www.primereact.org/images/themes/saga-blue.png`} alt="Saga Blue" />
                            </button>
                            <span>Saga Blue</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('saga-green')}>
                                <img src={`https://www.primereact.org/images/themes/saga-green.png`} alt="Saga Green" />
                            </button>
                            <span>Saga Green</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('saga-orange')}>
                                <img src={`https://www.primereact.org/images/themes/saga-orange.png`} alt="Saga Orange" />
                            </button>
                            <span>Saga Orange</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('saga-purple')}>
                                <img src={`https://www.primereact.org/images/themes/saga-purple.png`} alt="Saga Purple" />
                            </button>
                            <span>Saga Purple</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('vela-blue', true)}>
                                <img src={`https://www.primereact.org/images/themes/vela-blue.png`} alt="Vela Blue" />
                            </button>
                            <span>Vela Blue</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('vela-green', true)}>
                                <img src={`https://www.primereact.org/images/themes/vela-green.png`} alt="Vela Green" />
                            </button>
                            <span>Vela Green</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('vela-orange', true)}>
                                <img src={`https://www.primereact.org/images/themes/vela-orange.png`} alt="Vela Orange" />
                            </button>
                            <span>Vela Orange</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('vela-purple', true)}>
                                <img src={`https://www.primereact.org/images/themes/vela-purple.png`} alt="Vela Purple" />
                            </button>
                            <span>Vela Purple</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('arya-blue', true)}>
                                <img src={`https://www.primereact.org/images/themes/arya-blue.png`} alt="Arya Blue" />
                            </button>
                            <span>Arya Blue</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('arya-green', true)}>
                                <img src={`https://www.primereact.org/images/themes/arya-green.png`} alt="Arya Green" />
                            </button>
                            <span>Arya Green</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('arya-orange', true)}>
                                <img src={`https://www.primereact.org/images/themes/arya-orange.png`} alt="Arya Orange" />
                            </button>
                            <span>Arya Orange</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('arya-purple', true)}>
                                <img src={`https://www.primereact.org/images/themes/arya-purple.png`} alt="Arya Purple" />
                            </button>
                            <span>Arya Purple</span>
                        </div>
                    </div>

                    <h4>Legacy</h4>
                    <div className="grid free-themes">
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('nova')}>
                                <img src={`https://www.primereact.org/images/themes/nova.png`} alt="Nova" />
                            </button>
                            <span>Nova</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('nova-alt')}>
                                <img src={`https://www.primereact.org/images/themes/nova-alt.png`} alt="Nova Alt" />
                            </button>
                            <span>Nova Alt</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('nova-accent')}>
                                <img src={`https://www.primereact.org/images/themes/nova-accent.png`} alt="Nova Accent" />
                            </button>
                            <span>Nova Accent</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('luna-blue', true)}>
                                <img src={`https://www.primereact.org/images/themes/luna-blue.png`} alt="Luna Blue" />
                            </button>
                            <span>Luna Blue</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('luna-green', true)}>
                                <img src={`https://www.primereact.org/images/themes/luna-green.png`} alt="Luna Green" />
                            </button>
                            <span>Luna Green</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('luna-amber', true)}>
                                <img src={`https://www.primereact.org/images/themes/luna-amber.png`} alt="Luna Amber" />
                            </button>
                            <span>Luna Amber</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('luna-pink', true)}>
                                <img src={`https://www.primereact.org/images/themes/luna-pink.png`} alt="Luna Pink" />
                            </button>
                            <span>Luna Pink</span>
                        </div>
                        <div className="col-3">
                            <button className="p-link" onClick={() => onThemeChange('rhea', false)}>
                                <img src={`https://www.primereact.org/images/themes/rhea.png`} alt="Rhea" />
                            </button>
                            <span>Rhea</span>
                        </div>
                    </div>

                    <h4>Premium Templates</h4>
                    <p>Beautifully created premium application templates.</p>
                    <div className="grid premium-themes">
                        <div className="col-12 md:col-6">
                            <a href="https://www.primefaces.org/layouts/apollo-react" rel="noopener noreferrer" target="_blank">
                                <img alt="Apollo" src={`https://www.primereact.org/images/layouts/apollo-nextjs.jpg`} />
                            </a>
                        </div>
                        <div className="col-12 md:col-6">
                            <a href="https://www.primefaces.org/sakai-react" rel="noopener noreferrer" target="_blank">
                                <img alt="Sakai" src={`https://www.primereact.org/images/layouts/sakai-react.jpg`} />
                            </a>
                        </div>
                        <div className="col-12 md:col-6">
                            <a href="https://www.primefaces.org/layouts/atlantis-react" rel="noopener noreferrer" target="_blank">
                                <img alt="Atlantis" src={`https://www.primereact.org/images/layouts/atlantis-react.jpg`} />
                            </a>
                        </div>
                        <div className="col-12 md:col-6">
                            <a href="https://www.primefaces.org/layouts/freya-react" rel="noopener noreferrer" target="_blank">
                                <img alt="Freya" src={`https://www.primereact.org/images/layouts/freya-react.jpg`} />
                            </a>
                        </div>
                        <div className="col-12 md:col-6">
                            <a href="https://www.primefaces.org/layouts/ultima-react" rel="noopener noreferrer" target="_blank">
                                <img alt="Ultima" src={`https://www.primereact.org/images/layouts/ultima-react.jpg`} />
                            </a>
                        </div>
                        <div className="col-12 md:col-6">
                            <a href="https://www.primefaces.org/layouts/diamond-react" rel="noopener noreferrer" target="_blank">
                                <img alt="Diamond" src={`https://www.primereact.org/images/layouts/diamond-react.jpg`} />
                            </a>
                        </div>
                        <div className="col-12 md:col-6">
                            <a href="https://www.primefaces.org/layouts/sapphire-react" rel="noopener noreferrer" target="_blank">
                                <img alt="Sapphire" src={`https://www.primereact.org/images/layouts/sapphire-react.jpg`} />
                            </a>
                        </div>
                        <div className="col-12 md:col-6">
                            <a href="https://www.primefaces.org/layouts/serenity-react" rel="noopener noreferrer" target="_blank">
                                <img alt="Serenity" src={`https://www.primereact.org/images/layouts/serenity-react.jpg`} />
                            </a>
                        </div>
                        <div className="col-12 md:col-6">
                            <a href="https://www.primefaces.org/layouts/babylon-react" rel="noopener noreferrer" target="_blank">
                                <img alt="Babylon" src={`https://www.primereact.org/images/layouts/babylon-react.jpg`} />
                            </a>
                        </div>
                        <div className="col-12 md:col-6">
                            <a href="https://www.primefaces.org/layouts/avalon-react" rel="noopener noreferrer" target="_blank">
                                <img alt="Avalon" src={`https://www.primereact.org/images/layouts/avalon-react.jpg`} />
                            </a>
                        </div>
                        <div className="col-12 md:col-6">
                            <a href="https://www.primefaces.org/layouts/roma-react" rel="noopener noreferrer" target="_blank">
                                <img alt="Roma" src={`https://www.primereact.org/images/layouts/roma-react.jpg`} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}
