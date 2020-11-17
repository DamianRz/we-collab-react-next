import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '../../button';
import { SearchField } from '../../search-field/search-field';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { Grid } from '@material-ui/core';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import './custom-table.scss';
import '../../../styles/theme-buttons.scss';
import '../../../styles/theme.scss';


export const CustomTable = (props: {
  title: string;
  items: any[];
  headers: { text: string; value: string }[];
  mobileHeaders?: { text: string; value: string }[];
  // sortColumnByOtherHeader: comportamiendo de ordenar una columna usando otra
  sortColumnByOtherHeader?: { headerToAction: string; headerToSort: string };
  noItemsMessage?: string;
  noSearchMessage?: string;
  showSearchField?: boolean;
  onSelectRow: any;
}) => {
  const [filtredItems, setFiltredItems] = useState(props.items || []);
  const [selectedHeader, setSelectedHeader] = useState(props.mobileHeaders[0]);
  const [isSortUp, setIsSortUp] = useState(true);
  const [selectedRow, setSelectedRow] = useState(undefined);

  const windowSize = useWindowSize();
  const gridHeaders: any = 12 / props.headers.length || 2;
  const gridsMobileHeaders: any = 12 / props.mobileHeaders.length || 6;
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    })
  );
  const classes = useStyles();

  const onSelectRow = (row: any) => {
    setSelectedRow(row);
    props.onSelectRow(row);
  }

  const compare = (a: any, b: any) => {
    let headerValue = selectedHeader.value;
    // sort column by another header
    if (props.sortColumnByOtherHeader) {
      if (headerValue === props.sortColumnByOtherHeader.headerToAction) {
        headerValue = props.sortColumnByOtherHeader.headerToSort;
      }
    }
    // default sort by key
    if (a[headerValue] < b[headerValue]) {
      return -1;
    }
    if (a[headerValue] > b[headerValue]) {
      return 1;
    }
    return 0;
  };


  useEffect(() => {
    // sort by date
    if (selectedHeader.value === 'startTimeFront') {
      const moment = require('moment');
      const sortedArrayByDates = filtredItems.sort((a: { startTime: string }, b: { startTime: string }) => new moment(a.startTime).format('YYYYMMDD') - new moment(b.startTime).format('YYYYMMDD'))
      if (isSortUp) {
        sortedArrayByDates.reverse();
      }
      setFiltredItems(sortedArrayByDates);
    } else {
      // default sort
      let sortItems = filtredItems.sort(compare);
      if (isSortUp) {
        sortItems.reverse();
      }
      setFiltredItems(sortItems);
    }
  }, [isSortUp]);

  const getDataByScreenSize = (screenSize: string) => {
    switch (screenSize) {
      case 'xs':
        return { headers: props.mobileHeaders, grid: gridsMobileHeaders };
      case 'md':
        return { headers: props.headers, grid: gridHeaders };
    }
    return { headers: props.headers, grid: gridHeaders };
  };

  const Header = (props: {}) => {
    return (
      <div className="header">
        <Grid container xl={12} spacing={3}>
          {getDataByScreenSize(windowSize.screenMode()).headers.map(
            (header: { text: string; value: string }, headerIndex) => {
              return (
                <Grid
                  item
                  xs={getDataByScreenSize(windowSize.screenMode()).grid}
                  xl={getDataByScreenSize(windowSize.screenMode()).grid}
                  sm={getDataByScreenSize(windowSize.screenMode()).grid}
                  key={headerIndex}
                  className={`header_${headerIndex}`}
                >
                  <div className="header-item">
                    <Button
                      label={header.text}
                      className={`${selectedHeader == header ? 'selected' : ''} theme-button-text`}
                      onClick={() => {
                        setSelectedHeader(header);
                        setIsSortUp(!isSortUp);
                      }}
                    />
                    <div className="header_button-content">
                      {selectedHeader == header ? (
                        isSortUp ? (
                          <AiFillCaretUp className="icon" />
                        ) : (
                            <AiFillCaretDown className="icon" />
                          )
                      ) : null}
                    </div>
                  </div>
                </Grid>
              );
            }
          )}
        </Grid>
      </div>
    );
  };

  const TableContent = (props: {}) => {
    return (
      <div className="row-box">
        {filtredItems.map((row, i) => {
          return (
            <div className="table-box" key={i}>
              <div className="content-box">
                <div className={classes.root}>
                  {/* ROWS */}
                  <div className={`row ${selectedRow == row ? 'selected-row' : ''}`}
                    onClick={() => {
                      // setSelectedRow(row);
                      onSelectRow(row);
                    }}
                  >
                    <Grid container xl={12} spacing={3}>
                      {getDataByScreenSize(windowSize.screenMode()).headers.map(
                        (
                          header: { text: string; value: string },
                          headerIndex
                        ) => {
                          return (
                            <Grid
                              item
                              xs={
                                getDataByScreenSize(windowSize.screenMode())
                                  .grid
                              }
                              xl={
                                getDataByScreenSize(windowSize.screenMode())
                                  .grid
                              }
                              sm={
                                getDataByScreenSize(windowSize.screenMode())
                                  .grid
                              }
                              key={headerIndex}
                              className={`header_${headerIndex}`}
                            >
                              {header.value != 'status' ? (
                                <p
                                  className={`${selectedHeader == header ? 'selected' : ''
                                    } item_table-text`}
                                >
                                  {row[header.value]}
                                </p>
                              ) : (
                                  <Button
                                    className="state-btn theme-button-outlined"
                                    label="status"
                                  />
                                )}
                            </Grid>
                          );
                        }
                      )}
                    </Grid>
                  </div>
                </div>
              </div>
              <div className="right-box"></div>
            </div>
          );
        })}
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className="table-footer">
        <div className="pagination-box">
          <p className="text dark-text">{`Total: ${filtredItems.length}`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="custom-table">
      <h1 className="font-title title text-light">{props.title}</h1>
      {!filtredItems && props.noItemsMessage ? (
        <div className="no-orders">
          <p>{props.noItemsMessage}</p>
        </div>
      ) : null}
      {!filtredItems && props.noSearchMessage ? (
        <div className="no-orders">
          <p>{props.noSearchMessage}</p>
        </div>
      ) : null}
      <div className="table">
        <div className="search-field">
          <SearchField
            items={filtredItems}
            onChangeResults={setFiltredItems}
            itemFilter={selectedHeader}
            fieldLabel={`Buscar: ${selectedHeader.text}`}
          />
        </div>
        <Header />
        <TableContent />
        <Footer />
      </div>
    </div>
  );
};
