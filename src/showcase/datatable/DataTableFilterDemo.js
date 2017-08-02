import React, { Component } from 'react';
import {DataTable} from '../../components/datatable/DataTable';
import {Column} from '../../components/column/Column';
import {InputText} from '../../components/inputtext/InputText';
import {CarService} from '../service/CarService';
import {Dropdown} from '../../components/dropdown/Dropdown';
import {DataTableSubmenu} from '../../showcase/datatable/DataTableSubmenu';

export class DataTableFilterDemo extends Component {

    constructor() {
        super();
        this.state = {
            filters: {}
        };
        this.carservice = new CarService();
        this.onBrandChange = this.onBrandChange.bind(this);
        this.onFilter = this.onFilter.bind(this);
    }

    componentDidMount() {
        this.carservice.getCarsLarge().then(data => this.setState({cars: data}));
    }

    onBrandChange(e) {
        let filters = this.state.filters;
        filters['brand'] = {value: e.value};
        this.setState({filters: filters});
    }

    onFilter(e) {
        this.setState({filters: e.filters});
    }

    render() {
        var header = <div style={{'textAlign':'left'}}>
                        <i className="fa fa-search" style={{margin:'4px 4px 0 0'}}></i>
                        <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Global Search" size="50"/>
                    </div>;

        let brands = [
                {label: 'All Brands', value: null},
                {label: 'Audi', value: 'Audi'},
                {label: 'BMW', value: 'BMW'},
                {label: 'Fiat', value: 'Fiat'},
                {label: 'Honda', value: 'Honda'},
                {label: 'Jaguar', value: 'Jaguar'},
                {label: 'Mercedes', value: 'Mercedes'},
                {label: 'Renault', value: 'Renault'},
                {label: 'VW', value: 'VW'},
                {label: 'Volvo', value: 'Volvo'}
            ];
        
        let brandFilter = <Dropdown style={{width: '100%'}} value={this.state.filters.brand ? this.state.filters.brand.value : null} options={brands} onChange={this.onBrandChange}/>

        return (
            <div>
                <DataTableSubmenu />

                <div className="content-section">
                    <div className="feature-intro">
                        <h1>DataTable - Filter</h1>
                        <p>Filtering is enabled by setting the filter property as true in column object. Default match mode is "startsWith" and this can be configured using filterMatchMode 
                            property of column object that also accepts "contains", "endsWith", "equals" and "in". An optional global filter feature is available to search all fields with a keyword. 
                            By default input fields are generated as filter elements and using templating any component can be used as a filter..</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <DataTable value={this.state.cars} paginator={true} rows={10} header={header} 
                        globalFilter={this.state.globalFilter} filters={this.state.filters} onFilter={this.onFilter}>
                        <Column field="vin" header="Vin" filter={true} />
                        <Column field="year" header="Year" filter={true} />
                        <Column field="brand" header="Brand" filter={true} filterElement={brandFilter}/>
                        <Column field="color" header="Color" filter={true} />
                    </DataTable>
                </div>
            </div>
        );
    }
}