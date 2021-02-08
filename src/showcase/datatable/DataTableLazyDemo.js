import React, { Component } from 'react';
import { DataTable } from '../../components/datatable/DataTable';
import { Column } from '../../components/column/Column';
import { TabView } from '../../components/tabview/TabView';
import { MultiSelect } from '../../components/multiselect/MultiSelect';
import { useLiveEditorTabs }from '../liveeditor/LiveEditor';
import { AppInlineHeader } from '../../AppInlineHeader';
import { CustomerService } from '../service/CustomerService';

export class DataTableLazyDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            totalRecords: 0,
            customers: null,
            selectedRepresentative: null,
            lazyParams: {
                first: 0,
                filters: {},
                sortField: '',
                sortOrder: null
            }
        };

        this.representatives = [
            { name: "Amy Elsner", image: 'amyelsner.png' },
            { name: "Anna Fali", image: 'annafali.png' },
            { name: "Asiya Javayant", image: 'asiyajavayant.png' },
            { name: "Bernardo Dominic", image: 'bernardodominic.png' },
            { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
            { name: "Ioni Bowcher", image: 'ionibowcher.png' },
            { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
            { name: "Onyama Limba", image: 'onyamalimba.png' },
            { name: "Stephen Shaw", image: 'stephenshaw.png' },
            { name: "XuXue Feng", image: 'xuxuefeng.png' }
        ];

        this.loadLazyData = this.loadLazyData.bind(this);
        this.onPage = this.onPage.bind(this);
        this.onSort = this.onSort.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onRepresentativesChange = this.onRepresentativesChange.bind(this);

        this.customerService = new CustomerService();
        this.loadLazyTimeout = null;
    }

    loadLazyData() {
        this.setState({ loading: true });

        if (this.loadLazyTimeout) {
            clearTimeout(this.loadLazyTimeout);
        }

        //imitate delay of a backend call
        this.loadLazyTimeout = setTimeout(() => {
            this.customerService.getCustomers({lazyEvent: JSON.stringify(this.state.lazyParams)}).then(data => {
                this.setState({
                    totalRecords: data.totalRecords,
                    customers: data.customers,
                    loading: false
                });
            });
        }, Math.random() * 1000 + 250);
    }

    onPage(event) {
        let lazyParams = { ...this.state.lazyParams, ...event };
        this.setState({ lazyParams }, this.loadLazyData);
    }

    onSort(event) {
        let lazyParams = { ...this.state.lazyParams, ...event };
        this.setState({ lazyParams }, this.loadLazyData);
    }

    onFilter(event) {
        let lazyParams = { ...this.state.lazyParams, ...event };
        lazyParams['first'] = 0;
        this.setState({ lazyParams }, this.loadLazyData);
    }

    componentDidMount() {
        this.setState({
            lazyParams: {
                first: 0,
                rows: 10,
                page: 1,
                pageCount: 20
            }
        }, this.loadLazyData);
    }

    representativeBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <img alt={rowData.representative.name} src={`showcase/demo/images/avatar/${rowData.representative.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{rowData.representative.name}</span>
            </React.Fragment>
        );
    }

    representativesItemTemplate(option) {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={`showcase/demo/images/avatar/${option.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{option.name}</span>
            </div>
        );
    }

    onRepresentativesChange(e) {
        this.dt.filter(e.value, 'representative.name', 'in');
        this.setState({ selectedRepresentative: e.value });
    }

    countryBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <img alt="flag" src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width={30} />
                <span className="image-text">{rowData.country.name}</span>
            </React.Fragment>
        );
    }

    render() {
        const representativeFilter = <MultiSelect value={this.state.selectedRepresentative} options={this.representatives} filter itemTemplate={this.representativesItemTemplate} onChange={this.onRepresentativesChange} optionLabel="name" optionValue="name" placeholder="All" className="p-column-filter" />;

        return (
            <div>
                <div className="content-section introduction">
                    <AppInlineHeader changelogText="dataTable">
                        <h1>DataTable <span>Lazy</span></h1>
                        <p>Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded by invoking corresponding callbacks everytime paging, sorting and filtering happens. Sample belows imitates
                        lazy paging by using an in memory list. It is also important to assign the logical number of rows to totalRecords by doing a projection query for paginator configuration so that paginator displays the UI assuming
                            there are actually records of totalRecords size although in reality they aren't as in lazy mode, only the records that are displayed on the current page exist.</p>
                    </AppInlineHeader>
                </div>

                <div className="content-section implementation">
                    <div className="card">
                        <DataTable ref={(el) => this.dt = el} value={this.state.customers} lazy
                            paginator first={this.state.lazyParams.first} rows={10} totalRecords={this.state.totalRecords} onPage={this.onPage}
                            onSort={this.onSort} sortField={this.state.lazyParams.sortField} sortOrder={this.state.lazyParams.sortOrder}
                            onFilter={this.onFilter} filters={this.state.lazyParams.filters} loading={this.state.loading}>
                            <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" />
                            <Column field="country.name" sortable header="Country" filterField="country.name" body={this.countryBodyTemplate} filter filterPlaceholder="Search by country" filterMatchMode="contains" />
                            <Column field="company" sortable filter header="Company" filterPlaceholder="Search by company" />
                            <Column field="representative.name" header="Representative" body={this.representativeBodyTemplate} filter filterElement={representativeFilter} />
                        </DataTable>
                    </div>
                </div>

                <DataTableLazyDemoDoc></DataTableLazyDemoDoc>
            </div>
        );
    }
}

export class DataTableLazyDemoDoc extends Component {

    constructor(props) {
        super(props);

        this.sources = {
            'class': {
                tabName: 'Class Source',
                content: `
import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import { CustomerService } from '../service/CustomerService';

export class DataTableLazyDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            first: 0,
            totalRecords: 0,
            customers: null,
            selectedRepresentative: null,
            sortEvent: {},
            filters: {},
            sortField: '',
            sortOrder: null,
        };

        this.representatives = [
            { name: "Amy Elsner", image: 'amyelsner.png' },
            { name: "Anna Fali", image: 'annafali.png' },
            { name: "Asiya Javayant", image: 'asiyajavayant.png' },
            { name: "Bernardo Dominic", image: 'bernardodominic.png' },
            { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
            { name: "Ioni Bowcher", image: 'ionibowcher.png' },
            { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
            { name: "Onyama Limba", image: 'onyamalimba.png' },
            { name: "Stephen Shaw", image: 'stephenshaw.png' },
            { name: "XuXue Feng", image: 'xuxuefeng.png' }
        ];

        this.customerService = new CustomerService();
        this.onPage = this.onPage.bind(this);
        this.onSort = this.onSort.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onRepresentativesChange = this.onRepresentativesChange.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });

        setTimeout(() => {
            const params = {
                first: 0,
                rows: 10,
                page: 1,
                pageCount: 20
            };

            this.customerService.getCustomers({ lazyEvent: JSON.stringify(params) }).then(data => {
                this.setState({
                    totalRecords: data.totalRecords,
                    customers: data.customers,
                    loading: false
                });
            });
        }, 500);
    }

    onPage(event) {
        this.setState({ loading: true });

        //imitate delay of a backend call
        setTimeout(() => {
            const params = {
                ...event,
                ...this.state.sortEvent,
                filters: this.state.filters
            };

            this.customerService.getCustomers({ lazyEvent: JSON.stringify(params) }).then(res => {
                this.setState({
                    first: event.first,
                    customers: res.customers,
                    totalRecords: res.totalRecords,
                    loading: false
                })
            })
        }, 500);
    }

    onSort(event) {
        this.setState({ loading: true });

        //imitate delay of a backend call
        setTimeout(() => {
            const params = {
                ...event,
                rows: 10,
                first: 0,
                filters: this.state.filters
            };

            this.customerService.getCustomers({ lazyEvent: JSON.stringify(params) }).then(res => {
                this.setState({
                    first: 0,
                    customers: res.customers,
                    totalRecords: res.totalRecords,
                    loading: false,
                    sortEvent: event,
                    sortField: event.sortField,
                    sortOrder: event.sortOrder
                })
            })
        }, 500);
    }

    onFilter(event) {
        const params = {
            ...event,
            rows: 10,
            first: 0,
            ...this.state.sortEvent
        };

        this.customerService.getCustomers({ lazyEvent: JSON.stringify(params) }).then(res => {
            this.setState({
                first: 0,
                customers: res.customers,
                totalRecords: res.totalRecords,
                loading: false,
                filters: event.filters
            })
        })
    }

    representativeBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <img alt={rowData.representative.name} src={\`showcase/demo/images/avatar/\${rowData.representative.image}\`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{rowData.representative.name}</span>
            </React.Fragment>
        );
    }

    representativesItemTemplate(option) {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={\`showcase/demo/images/avatar/\${option.image}\`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{option.name}</span>
            </div>
        );
    }

    onRepresentativesChange(e) {
        this.dt.filter(e.value, 'representative.name', 'in');
        this.setState({ selectedRepresentative: e.value });
    }

    countryBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <img alt="flag" src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={\`flag flag-\${rowData.country.code}\`} width={30} />
                <span className="image-text">{rowData.country.name}</span>
            </React.Fragment>
        );
    }

    render() {
        const representativeFilter = <MultiSelect value={this.state.selectedRepresentative} options={this.representatives} filter itemTemplate={this.representativesItemTemplate} onChange={this.onRepresentativesChange} optionLabel="name" optionValue="name" placeholder="All" className="p-column-filter" />;

        return (
            <div>
                <div className="content-section implementation">
                    <div className="card">
                        <DataTable ref={(el) => this.dt = el} value={this.state.customers} paginator rows={10} totalRecords={this.state.totalRecords}
                            lazy first={this.state.first} onPage={this.onPage} onSort={this.onSort} sortField={this.state.sortField} sortOrder={this.state.sortOrder} onFilter={this.onFilter} filters={this.state.filters} loading={this.state.loading}>
                            <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" ></Column>
                            <Column field="country.name" sortable header="Country" filterField="country.name" body={this.countryBodyTemplate} filter filterPlaceholder="Search by country" filterMatchMode="contains"></Column>
                            <Column field="company" sortable filter header="Company" filterPlaceholder="Search by company"></Column>
                            <Column field="representative.name" header="Representative" body={this.representativeBodyTemplate} filter filterElement={representativeFilter} />
                        </DataTable>
                    </div>
                </div>
            </div>
        );
    }
}
                `
            },
            'hooks': {
                tabName: 'Hooks Source',
                content: `
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import { CustomerService } from '../service/CustomerService';

export const DataTableLazyDemo = () => {

    const [loading, setLoading] = useState(false);
    const [first, setFirst] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [customers, setCustomers] = useState(null);
    const [selectedRepresentative, setSelectedRepresentative] = useState(null);
    const [sortEvent, setSortEvent] = useState({});
    const [filters, setFilters] = useState({});
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState(null);
    const dt = useRef(null);

    const representatives = [
        { name: "Amy Elsner", image: 'amyelsner.png' },
        { name: "Anna Fali", image: 'annafali.png' },
        { name: "Asiya Javayant", image: 'asiyajavayant.png' },
        { name: "Bernardo Dominic", image: 'bernardodominic.png' },
        { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
        { name: "Ioni Bowcher", image: 'ionibowcher.png' },
        { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
        { name: "Onyama Limba", image: 'onyamalimba.png' },
        { name: "Stephen Shaw", image: 'stephenshaw.png' },
        { name: "XuXue Feng", image: 'xuxuefeng.png' }
    ];

    const customerService = new CustomerService();

    useEffect(() => {

        setLoading(true);

        setTimeout(() => {
            const params = {
                first: 0,
                rows: 10,
                page: 1,
                pageCount: 20
            };

            customerService.getCustomers({ lazyEvent: JSON.stringify(params) }).then(data => {
                setTotalRecords(data.totalRecords);
                setCustomers(data.customers);
                setLoading(false);
            });
        }, 500);
    },[])

    const onPage = (event) => {
       setLoading(true)

        //imitate delay of a backend call
        setTimeout(() => {
            const params = {
                ...event,
                ...sortEvent,
                filters: filters
            };

            customerService.getCustomers({ lazyEvent: JSON.stringify(params) }).then(res => {
                setFirst(event.first);
                setCustomers(res.customers);
                setTotalRecords(res.totalRecords);
                setLoading(false);
            })
        }, 500);
    }

    const onSort = (event) => {
        setLoading(true);

        //imitate delay of a backend call
        setTimeout(() => {
            const params = {
                ...event,
                rows: 10,
                first: 0,
                filters: filters
            };

            customerService.getCustomers({ lazyEvent: JSON.stringify(params) }).then(res => {
                setFirst(0);
                setCustomers(res.customers)
                setTotalRecords(res.totalRecords);
                setLoading(false);
                setSortEvent(event);
                setSortField(event.sortField);
                setSortOrder(event.sortOrder);
            })
        }, 500);
    }

    const onFilter = (event) => {
        const params = {
            ...event,
            rows: 10,
            first: 0,
            ...sortEvent
        };

        customerService.getCustomers({ lazyEvent: JSON.stringify(params) }).then(res => {
            setFirst(0);
            setCustomers(res.customers);
            setTotalRecords(res.totalRecords);
            setLoading(false);
            setFilters(event.filters)
        });
    }

    const representativeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt={rowData.representative.name} src={\`showcase/demo/images/avatar/\${rowData.representative.image}\`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{rowData.representative.name}</span>
            </React.Fragment>
        );
    }

    const representativesItemTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={\`showcase/demo/images/avatar/\${option.image}\`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{option.name}</span>
            </div>
        );
    }

    const onRepresentativesChange = (e) => {
        dt.current.filter(e.value, 'representative.name', 'in');
        setSelectedRepresentative(e.value);
    }

    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt="flag" src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={\`flag flag-\${rowData.country.code}\`} width={30} />
                <span className="image-text">{rowData.country.name}</span>
            </React.Fragment>
        );
    }

    const representativeFilter = <MultiSelect value={selectedRepresentative} options={representatives} filter itemTemplate={representativesItemTemplate} onChange={onRepresentativesChange} optionLabel="name" optionValue="name" placeholder="All" className="p-column-filter" />;

    return (
        <div>
            <div className="content-section implementation">
                <div className="card">
                    <DataTable ref={dt} value={customers} paginator rows={10} totalRecords={totalRecords}
                        lazy first={first} onPage={onPage} onSort={onSort} sortField={sortField} sortOrder={sortOrder} onFilter={onFilter} filters={filters} loading={loading}>
                        <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" ></Column>
                        <Column field="country.name" sortable header="Country" filterField="country.name" body={countryBodyTemplate} filter filterPlaceholder="Search by country" filterMatchMode="contains"></Column>
                        <Column field="company" sortable filter header="Company" filterPlaceholder="Search by company"></Column>
                        <Column field="representative.name" header="Representative" body={representativeBodyTemplate} filter filterElement={representativeFilter} />
                    </DataTable>
                </div>
            </div>
        </div>
    );

}
                `
            },
            'ts': {
                tabName: 'TS Source',
                content: `
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import { CustomerService } from '../service/CustomerService';

export const DataTableLazyDemo = () => {

    const [loading, setLoading] = useState(false);
    const [first, setFirst] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [customers, setCustomers] = useState(null);
    const [selectedRepresentative, setSelectedRepresentative] = useState(null);
    const [sortEvent, setSortEvent] = useState({});
    const [filters, setFilters] = useState({});
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState(null);
    const dt = useRef(null);

    const representatives = [
        { name: "Amy Elsner", image: 'amyelsner.png' },
        { name: "Anna Fali", image: 'annafali.png' },
        { name: "Asiya Javayant", image: 'asiyajavayant.png' },
        { name: "Bernardo Dominic", image: 'bernardodominic.png' },
        { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
        { name: "Ioni Bowcher", image: 'ionibowcher.png' },
        { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
        { name: "Onyama Limba", image: 'onyamalimba.png' },
        { name: "Stephen Shaw", image: 'stephenshaw.png' },
        { name: "XuXue Feng", image: 'xuxuefeng.png' }
    ];

    const customerService = new CustomerService();

    useEffect(() => {

        setLoading(true);

        setTimeout(() => {
            const params = {
                first: 0,
                rows: 10,
                page: 1,
                pageCount: 20
            };

            customerService.getCustomers({ lazyEvent: JSON.stringify(params) }).then(data => {
                setTotalRecords(data.totalRecords);
                setCustomers(data.customers);
                setLoading(false);
            });
        }, 500);
    },[])

    const onPage = (event) => {
        setLoading(true)

        //imitate delay of a backend call
        setTimeout(() => {
            const params = {
                ...event,
                ...sortEvent,
                filters: filters
            };

            customerService.getCustomers({ lazyEvent: JSON.stringify(params) }).then(res => {
                setFirst(event.first);
                setCustomers(res.customers);
                setTotalRecords(res.totalRecords);
                setLoading(false);
            })
        }, 500);
    }

    const onSort = (event) => {
        setLoading(true);

        //imitate delay of a backend call
        setTimeout(() => {
            const params = {
                ...event,
                rows: 10,
                first: 0,
                filters: filters
            };

            customerService.getCustomers({ lazyEvent: JSON.stringify(params) }).then(res => {
                setFirst(0);
                setCustomers(res.customers)
                setTotalRecords(res.totalRecords);
                setLoading(false);
                setSortEvent(event);
                setSortField(event.sortField);
                setSortOrder(event.sortOrder);
            })
        }, 500);
    }

    const onFilter = (event) => {
        const params = {
            ...event,
            rows: 10,
            first: 0,
            ...sortEvent
        };

        customerService.getCustomers({ lazyEvent: JSON.stringify(params) }).then(res => {
            setFirst(0);
            setCustomers(res.customers);
            setTotalRecords(res.totalRecords);
            setLoading(false);
            setFilters(event.filters)
        });
    }

    const representativeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt={rowData.representative.name} src={\`showcase/demo/images/avatar/\${rowData.representative.image}\`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{rowData.representative.name}</span>
            </React.Fragment>
        );
    }

    const representativesItemTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={\`showcase/demo/images/avatar/\${option.image}\`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{option.name}</span>
            </div>
        );
    }

    const onRepresentativesChange = (e) => {
        dt.current.filter(e.value, 'representative.name', 'in');
        setSelectedRepresentative(e.value);
    }

    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt="flag" src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={\`flag flag-\${rowData.country.code}\`} width={30} />
                <span className="image-text">{rowData.country.name}</span>
            </React.Fragment>
        );
    }

    const representativeFilter = <MultiSelect value={selectedRepresentative} options={representatives} filter itemTemplate={representativesItemTemplate} onChange={onRepresentativesChange} optionLabel="name" optionValue="name" placeholder="All" className="p-column-filter" />;

    return (
        <div>
            <div className="content-section implementation">
                <div className="card">
                    <DataTable ref={dt} value={customers} paginator rows={10} totalRecords={totalRecords}
                        lazy first={first} onPage={onPage} onSort={onSort} sortField={sortField} sortOrder={sortOrder} onFilter={onFilter} filters={filters} loading={loading}>
                        <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" ></Column>
                        <Column field="country.name" sortable header="Country" filterField="country.name" body={countryBodyTemplate} filter filterPlaceholder="Search by country" filterMatchMode="contains"></Column>
                        <Column field="company" sortable filter header="Company" filterPlaceholder="Search by company"></Column>
                        <Column field="representative.name" header="Representative" body={representativeBodyTemplate} filter filterElement={representativeFilter} />
                    </DataTable>
                </div>
            </div>
        </div>
    );

}
                `
            }
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="content-section documentation">
                <TabView>
                    {
                        useLiveEditorTabs({ name: 'DataTableLazyDemo', sources: this.sources, service: 'CustomerService' })
                    }
                </TabView>
            </div>
        )
    }
}
