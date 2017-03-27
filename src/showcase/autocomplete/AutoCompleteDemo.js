import React, { Component } from 'react';
import { AutoComplete } from '../../components/autocomplete/AutoComplete';
import { CountryService } from '../service/CountryService';
import { TabView, TabPanel } from '../../components/tabview/TabView';
import { CodeHighlight } from '../../components/codehighlight/CodeHighlight';

export class AutoCompleteDemo extends Component {

    constructor() {
        super();
        this.state = { countriesData: [] };
        this.countryservice = new CountryService();
    }

    componentDidMount() {
        this.setState({ countriesData: this.countryservice.getCountries(this) });
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo'];
    }

    onCountryValueChange(e) {
        this.setState({ country: e.value, filteredCountriesSingle: null });
    }

    onBrandValueChange(e) {
        this.setState({ brand: e.value, filteredBrands: null });
    }

    onCountriesValueChange(e) {
        this.setState({ countries: e.value, filteredCountriesMultiple: null });
    }

    filterCountrySingle(event) {
        var results = this.state.countriesData.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredCountriesSingle: results });
    }

    filterBrands(event) {
        var results = this.brands.filter((brand) => {
            return brand.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredBrands: results });
    }

    filterCountryMultiple(event) {
        var results = this.state.countriesData.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredCountriesMultiple: results });
    }

    itemTemplate(brand) {
        if (!brand) {
            return;
        }

        return (<div className="ui-helper-clearfix" style={{ borderBottom: '1px solid #D5D5D5' }}>
            <img alt={brand} src={`showcase/resources/demo/images/car/${brand}.gif`} style={{ width: '32px', display: 'inline-block', margin: '5px 0 2px 5px' }} />
            <div style={{ fontSize: '18px', float: 'right', margin: '10px 10px 0 0' }}>{brand}</div>
        </div>)
    }

    handleDropdownClick() {
        this.setState({ filteredBrands: [] });

        //mimic remote call
        setTimeout(() => {
            this.setState({ filteredBrands: this.brands });
        }, 100)

    }

    render() {
        return (
            <div>
                <div className="content-section">
                    <div className="feature-intro">
                        <h1>AutoComplete</h1>
                        <p>AutoComplete is an input component that provides real-time suggestions when being typed.</p>
                    </div>
                </div>

                <div className="content-section implementation button-demo">
                    <h3>Basic</h3>
                    <AutoComplete value={this.state.country} suggestions={this.state.filteredCountriesSingle} completeMethod={this.filterCountrySingle.bind(this)} field="name"
                        size={30} placeholder="Countries" minLength={1} onChange={this.onCountryValueChange.bind(this)} />
                    <span style={{ marginLeft: '10px' }}>Country: {this.state.country ? this.state.country.name || this.state.country : 'none'}</span>

                    <h3>Advanced</h3>
                    <AutoComplete value={this.state.brand} suggestions={this.state.filteredBrands} completeMethod={this.filterBrands.bind(this)} size={30} minLength={1}
                        placeholder="Hint: type 'v' or 'f'" dropdown={true} onDropdownClick={this.handleDropdownClick.bind(this)} itemTemplate={this.itemTemplate.bind(this)} onChange={this.onBrandValueChange.bind(this)} />
                    <span style={{ marginLeft: '50px' }}>Brand: {this.state.brand || 'none'}</span>

                    <h3>Multiple</h3>
                    <AutoComplete value={this.state.countries} suggestions={this.state.filteredCountriesMultiple} completeMethod={this.filterCountryMultiple.bind(this)}
                        minLength={1} placeholder="Countries" field="name" multiple={true} onChange={this.onCountriesValueChange.bind(this)} />
                    <ul>
                        {this.state.countries && this.state.countries.map((c, index) => <li key={index}>{c.name}</li>)}
                    </ul>
                </div>

                <AutoCompleteDoc />
            </div>
        )
    }
}

class AutoCompleteDoc extends Component {

    render() {
        return (
            <div className="content-section source">
                <TabView>
                    <TabPanel header="Documentation">
                        <h3>Import</h3>
                        <CodeHighlight className="language-javascript">
                            {`
import { AutoComplete } from 'primereact';

`}
                        </CodeHighlight>

                        <h3>Getting Started</h3>
                        <p>AutoComplete requires a list of suggestions and a completeMethod to query for the results.</p>
                        <CodeHighlight className="language-markup">
                            {`
<AutoComplete value={this.state.brand} suggestions={this.state.filteredBrands} completeMethod={this.filterBrands.bind(this)} />

`}
                        </CodeHighlight>

                        <CodeHighlight className="language-javascript">
                            {`
constructor() {
    super();
    this.state = { };
}

componentDidMount() {
    this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo'];
}

onBrandValueChange(e) {
    this.setState({ brand: e.value, filteredBrands: null });
}

filterBrands(event) {
    var results = this.brands.filter((brand) => {
         return brand.toLowerCase().startsWith(event.query.toLowerCase());
    });
    this.setState({ filteredBrands: results });
}

render() {
    return (
        <AutoComplete value={this.state.brand} suggestions={this.state.filteredBrands} completeMethod={this.filterBrands.bind(this)} />
    );
}

`}
                        </CodeHighlight>
                        <h3>Attributes</h3>
                        <div className="doc-tablewrapper">
                            <table className="doc-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Default</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>suggestions</td>
                                        <td>array</td>
                                        <td>null</td>
                                        <td>An array of suggestions to display.</td>
                                    </tr>
                                    <tr>
                                        <td>field</td>
                                        <td>any</td>
                                        <td>null</td>
                                        <td>Field of a suggested object to resolve and display.</td>
                                    </tr>
                                    <tr>
                                        <td>scrollHeight</td>
                                        <td>string</td>
                                        <td>200px</td>
                                        <td>Maximum height of the suggestions panel.</td>
                                    </tr>
                                    <tr>
                                        <td>dropdown</td>
                                        <td>boolean</td>
                                        <td>false</td>
                                        <td>Displays a button next to the input field when enabled.</td>
                                    </tr>
                                    <tr>
                                        <td>multiple</td>
                                        <td>boolean</td>
                                        <td>false</td>
                                        <td>Specifies if multiple values can be selected.</td>
                                    </tr>
                                    <tr>
                                        <td>minLength</td>
                                        <td>number</td>
                                        <td>1</td>
                                        <td>Minimum number of characters to initiate a search.</td>
                                    </tr>
                                    <tr>
                                        <td>delay</td>
                                        <td>number</td>
                                        <td>300</td>
                                        <td>Delay between keystrokes to wait before sending a query.</td>
                                    </tr>
                                    <tr>
                                        <td>style</td>
                                        <td>string</td>
                                        <td>null</td>
                                        <td>Inline style of the component.</td>
                                    </tr>
                                    <tr>
                                        <td>styleClass</td>
                                        <td>string</td>
                                        <td>null</td>
                                        <td>Style class of the component.</td>
                                    </tr>
                                    <tr>
                                        <td>inputStyle</td>
                                        <td>string</td>
                                        <td>null</td>
                                        <td>Inline style of the input field.</td>
                                    </tr>
                                    <tr>
                                        <td>inputStyleClass</td>
                                        <td>string</td>
                                        <td>null</td>
                                        <td>Inline style of the input field.</td>
                                    </tr>
                                    <tr>
                                        <td>placeholder</td>
                                        <td>string</td>
                                        <td>null</td>
                                        <td>Hint text for the input field.</td>
                                    </tr>
                                    <tr>
                                        <td>readonly</td>
                                        <td>boolean</td>
                                        <td>false</td>
                                        <td>When present, it specifies that the input cannot be typed.</td>
                                    </tr>
                                    <tr>
                                        <td>disabled</td>
                                        <td>boolean</td>
                                        <td>false</td>
                                        <td>When present, it specifies that the component should be disabled.</td>
                                    </tr>
                                    <tr>
                                        <td>maxlength</td>
                                        <td>number</td>
                                        <td>null</td>
                                        <td>Maximum number of character allows in the input field.</td>
                                    </tr>
                                    <tr>
                                        <td>size</td>
                                        <td>number</td>
                                        <td>null</td>
                                        <td>Size of the input field.</td>
                                    </tr>
                                    <tr>
                                        <td>appendTo</td>
                                        <td>any</td>
                                        <td>null</td>
                                        <td>Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element.</td>
                                    </tr>
                                    <tr>
                                        <td>tabindex</td>
                                        <td>number</td>
                                        <td>null</td>
                                        <td>Index of the element in tabbing order.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <h3>Events</h3>
                        <div className="doc-tablewrapper">
                            <table className="doc-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Parameters</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>completeMethod</td>
                                        <td>
                                            event.originalEvent: browser event <br />
                                            event.query: Value to search with
                                        </td>
                                        <td>Callback to invoke to search for suggestions.</td>
                                    </tr>
                                    <tr>
                                        <td>onFocus</td>
                                        <td>event: Browser event</td>
                                        <td>Callback to invoke when autocomplete gets focus.</td>
                                    </tr>                        
                                    <tr>
                                        <td>onSelect</td>
                                        <td>
                                            value: Selected value
                                        </td>
                                        <td>Callback to invoke when a suggestion is selected.</td>
                                    </tr>
                                    <tr>
                                        <td>onUnselect</td>
                                        <td>
                                            value: Unselected value in multiple mode
                                        </td>
                                        <td>Callback to invoke when a selected value is removed.</td>
                                    </tr>
                                    <tr>
                                        <td>onDropdownClick</td>
                                        <td>
                                            event.originalEvent: browser event <br />
                                            event.query: Current value of the input field
                                        </td>
                                        <td>Callback to invoke to when dropdown button is clicked.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>Styling</h3>
                        <p>Following is the list of structural style classes</p>
                        <div className="doc-tablewrapper">
                            <table className="doc-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Element</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ui-autocomplete</td>
                                        <td>Container element</td>
                                    </tr>
                                    <tr>
                                        <td>ui-autocomplete-panel</td>
                                        <td>Overlay panel of suggestions.</td>
                                    </tr>
                                    <tr>
                                        <td>ui-autocomplete-items</td>
                                        <td>List container of suggestions.</td>
                                    </tr>
                                    <tr>
                                        <td>ui-autocomplete-item</td>
                                        <td>List item of a suggestion.</td>
                                    </tr>
                                    <tr>
                                        <td>ui-autocomplete-token</td>
                                        <td>Element of a selected item in multiple mode.</td>
                                    </tr>
                                    <tr>
                                        <td>ui-autocomplete-token-icon</td>
                                        <td>Close icon element of a selected item in multiple mode.</td>
                                    </tr>
                                    <tr>
                                        <td>ui-autocomplete-token-label</td>
                                        <td>Label of a selected item in multiple mode.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>Dependencies</h3>
                        <p>None.</p>
                    </TabPanel>

                    <TabPanel header="Source">
                        <CodeHighlight className="language-javascript">
                            {`
export class AutoCompleteDemo extends Component {

    constructor() {
        super();
        this.state = { countriesData: [] };
        this.countryservice = new CountryService();
    }

    componentDidMount() {
        this.setState({ countriesData: this.countryservice.getCountries(this) });
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo'];
    }

    onCountryValueChange(e) {
        this.setState({ country: e.value, filteredCountriesSingle: null });
    }

    onBrandValueChange(e) {
        this.setState({ brand: e.value, filteredBrands: null });
    }

    onCountriesValueChange(e) {
        this.setState({ countries: e.value, filteredCountriesMultiple: null });
    }

    filterCountrySingle(event) {
        var results = this.state.countriesData.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredCountriesSingle: results });
    }

    filterBrands(event) {
        var results = this.brands.filter((brand) => {
            return brand.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredBrands: results });
    }

    filterCountryMultiple(event) {
        var results = this.state.countriesData.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredCountriesMultiple: results });
    }

    itemTemplate(brand) {
        if (!brand) {
            return;
        }

        return (<div className="ui-helper-clearfix" style={{ borderBottom: '1px solid #D5D5D5' }}>
            <img alt={brand} src={\`showcase/resources/demo/images/car/\${brand}.gif\`} style={{ width: '32px', display: 'inline-block', margin: '5px 0 2px 5px' }} />
            <div style={{ fontSize: '18px', float: 'right', margin: '10px 10px 0 0' }}>{brand}</div>
        </div>)
    }

    handleDropdownClick() {
        this.setState({ filteredBrands: [] });

        //mimic remote call
        setTimeout(() => {
            this.setState({ filteredBrands: this.brands });
        }, 100)

    }

    render() {
        return (
            <div>
                <div className="content-section">
                    <div className="feature-intro">
                        <h1>AutoComplete</h1>
                        <p>AutoComplete is an input component that provides real-time suggestions when being typed.</p>
                    </div>
                </div>

                <div className="content-section implementation button-demo">
                    <h3>Basic</h3>
                    <AutoComplete value={this.state.country} suggestions={this.state.filteredCountriesSingle} completeMethod={this.filterCountrySingle.bind(this)} field="name"
                        size={30} placeholder="Countries" minLength={1} onChange={this.onCountryValueChange.bind(this)} />
                    <span style={{ marginLeft: '10px' }}>Country: {this.state.country ? this.state.country.name || this.state.country : 'none'}</span>

                    <h3>Advanced</h3>
                    <AutoComplete value={this.state.brand} suggestions={this.state.filteredBrands} completeMethod={this.filterBrands.bind(this)} size={30} minLength={1}
                        placeholder="Hint: type 'v' or 'f'" dropdown={true} onDropdownClick={this.handleDropdownClick.bind(this)} itemTemplate={this.itemTemplate.bind(this)} onChange={this.onBrandValueChange.bind(this)} />
                    <span style={{ marginLeft: '50px' }}>Brand: {this.state.brand || 'none'}</span>

                    <h3>Multiple</h3>
                    <AutoComplete value={this.state.countries} suggestions={this.state.filteredCountriesMultiple} completeMethod={this.filterCountryMultiple.bind(this)}
                        minLength={1} placeholder="Countries" field="name" multiple={true} onChange={this.onCountriesValueChange.bind(this)} />
                    <ul>
                        {this.state.countries && this.state.countries.map((c, index) => <li key={index}>{c.name}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}
`}
                        </CodeHighlight>
                    </TabPanel>
                </TabView >
            </div>
        )
    }
}