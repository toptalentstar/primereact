import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { FloatLabel } from '@/components/lib/floatlabel/FloatLabel';
import { TreeSelect } from '@/components/lib/treeselect/TreeSelect';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NodeService } from '../../../service/NodeService';

export function FloatLabelDoc(props) {
    const [nodes, setNodes] = useState(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);

    useEffect(() => {
        NodeService.getTreeNodes().then((data) => setNodes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const code = {
        basic: `
<FloatLabel className="w-full md:w-20rem">
    <TreeSelect inputId="treeselect" value={selectedNodeKey} onChange={(e) => setSelectedNodeKey(e.value)} options={nodes} 
        className="w-full"></TreeSelect>
    <label htmlFor="treeselect">TreeSelect</label>
</FloatLabel>
        `,
        javascript: `
import React, { useState, useEffect } from "react";
import { TreeSelect } from 'primereact/treeselect';
import { FloatLabel } from 'primereact/floatlabel';
import { NodeService } from './service/NodeService';

export default function FloatLabelDemo() {
    const [nodes, setNodes] = useState(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    
    useEffect(() => {
        NodeService.getTreeNodes().then((data) => setNodes(data));
    }, []);

    return (
        <div className="card flex justify-content-center">
            <FloatLabel className="w-full md:w-20rem">
                <TreeSelect inputId="treeselect" value={selectedNodeKey} onChange={(e) => setSelectedNodeKey(e.value)} options={nodes} 
                    className="w-full"></TreeSelect>
                <label htmlFor="treeselect">TreeSelect</label>
            </FloatLabel>
        </div>
    );
}
        `,
        typescript: `
import React, { useState, useEffect } from "react";
import { TreeSelect, TreeSelectChangeEvent } from 'primereact/treeselect';
import { FloatLabel } from 'primereact/floatlabel';
import { TreeNode } from 'primereact/treenode';
import { NodeService } from './service/NodeService';

export default function FloatLabelDemo() {
    const [nodes, setNodes] = useState<TreeNode[] | null>(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState<string>(null);
    
    useEffect(() => {
        NodeService.getTreeNodes().then((data) => setNodes(data));
    }, []);

    return (
        <div className="card flex justify-content-center">
            <FloatLabel className="w-full md:w-20rem">
                <TreeSelect inputId="treeselect" value={selectedNodeKey} options={nodes} onChange={(e : TreeSelectChangeEvent) => setSelectedNodeKey(e.value)} 
                    className="w-full"></TreeSelect>
                <label htmlFor="treeselect">TreeSelect</label>
            </FloatLabel>
        </div>
    );
}
        `,
        data: `
/* NodeService */
{
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    children: [
        {
            key: '0-0',
            label: 'Work',
            data: 'Work Folder',
            icon: 'pi pi-fw pi-cog',
            children: [
                { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
            ]
        },
        {
            key: '0-1',
            label: 'Home',
            data: 'Home Folder',
            icon: 'pi pi-fw pi-home',
            children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
        }
    ]
},
...
`
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    A floating label appears on top of the input field when focused. Visit <Link href="/floatlabel">FloatLabel</Link> documentation for more information.
                </p>
            </DocSectionText>
            <div className="card flex justify-content-center">
                <FloatLabel className="w-full md:w-20rem">
                    <TreeSelect inputId="treeselect" value={selectedNodeKey} onChange={(e) => setSelectedNodeKey(e.value)} options={nodes} className="w-full" />
                    <label htmlFor="treeselect">TreeSelect</label>
                </FloatLabel>
            </div>
            <DocSectionCode code={code} service={['NodeService']} />
        </>
    );
}
