<Paper className={classes.paper}>
<Table stickyHeader aria-label="sticky table">
  <TableHead className={classes.tableRow}>
    <TableRow hover className={classes.tableRow}>
      {cellList.map(c => {
        return <TableCell key={c.id} style={{textAlign: "center"}} className={classes.tableHead}>{c.name}</TableCell>
      })}
    </TableRow>
  </TableHead>
  <TableBody>
    {this.state.customers ?
      filteredComponents(this.state.customers) :
      <TableRow>
        <TableCell colSpan="6" align="center">
          <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
        </TableCell>
      </TableRow>
    }
  </TableBody>
</Table>
</Paper>