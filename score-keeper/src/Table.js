import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class MatTable extends React.Component {

    defaultRow(name) {
        return {
            "name": name,
            "aValue": {
                "current": 0,
                "total": 0
            },
            "bValue": {
                "current": 0,
                "total": 0
            },
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            TableData: [
                this.defaultRow("Pots"),
                this.defaultRow("Valids"),
                this.defaultRow("Misses"),
                this.defaultRow("Fouls")
            ]
        }
    }

    centeredTableCell(name) {
        return <TableCell align="center">{name}</TableCell>
    }

    centeredTableCellWithColSpan(name, span) {
        return <TableCell align="center" colSpan={span}>{name}</TableCell>
    }

    render() {
        return <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        {this.centeredTableCellWithColSpan("Player A", 2)}
                        {this.centeredTableCellWithColSpan("Player B", 2)}
                    </TableRow>
                    <TableRow>
                        <TableCell/>
                        {this.centeredTableCell("Current")}
                        {this.centeredTableCell("Total")}
                        {this.centeredTableCell("Current")}
                        {this.centeredTableCell("Total")}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.TableData.map((p, ix) => {
                        return <TableRow key={ix}>
                            <TableCell component="th" scope="row">{p.name}</TableCell>
                            {this.centeredTableCell(p.aValue ? p.aValue.current : 0)}
                            {this.centeredTableCell(p.aValue ? p.aValue.total : 0)}
                            {this.centeredTableCell(p.bValue ? p.bValue.current : 0)}
                            {this.centeredTableCell(p.bValue ? p.bValue.total : 0)}
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    }
}

export default MatTable;