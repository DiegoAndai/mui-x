import * as React from 'react';
import {
  GridClearIcon,
  GridDeleteIcon,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridRowSelectionCountSelector,
  gridRowSelectionIdsSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid-premium';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { iconButtonClasses } from '@mui/material/IconButton';
import { ToolbarAddItem } from './ToolbarAddItem';
import { ToolbarColumnsItem } from './ToolbarColumnsItem';
import { ToolbarSortItem } from './ToolbarSortItem';
import { ToolbarDensityItem } from './ToolbarDensityItem';
import { ToolbarFilterItem } from './ToolbarFilterItem';
import { ToolbarButton } from './ToolbarButton';

export function Toolbar(props) {
  const { listView = false, container, handleUpload, handleDelete } = props;
  const apiRef = useGridApiContext();
  const selectionCount = useGridSelector(apiRef, gridRowSelectionCountSelector);
  const showSelectionOptions = selectionCount > 0;

  const handleClearSelection = () => {
    apiRef.current.setRowSelectionModel({ type: 'include', ids: new Set() });
  };

  const handleDeleteSelectedRows = () => {
    handleClearSelection();
    const selectedRows = gridRowSelectionIdsSelector(apiRef);
    handleDelete?.(Array.from(selectedRows.keys()));
  };

  const itemProps = {
    listView,
    container,
  };

  return (
    <GridToolbarContainer
      sx={{
        position: 'relative',
        borderBottom: '1px solid',
        borderColor: 'divider',
        minHeight: 45,
        px: 0.5,
        py: 0.25,
        gap: 0,
      }}
    >
      {showSelectionOptions ? (
        <React.Fragment>
          <ToolbarButton sx={{ mr: 0.5 }} onClick={handleClearSelection}>
            <GridClearIcon fontSize="small" />
          </ToolbarButton>

          <Typography variant="body2">{selectionCount} selected</Typography>

          <ToolbarButton sx={{ ml: 'auto' }} onClick={handleDeleteSelectedRows}>
            <GridDeleteIcon fontSize="small" />
          </ToolbarButton>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box
            sx={{
              ml: 0.5,
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              '& > *': {
                width: '100%',
                maxWidth: 260,
                pb: 0,
                [`& .${iconButtonClasses.root}`]: {
                  mr: -0.5,
                },
                [`& .${outlinedInputClasses.root}`]: {
                  px: 1,
                },
                [`& .${outlinedInputClasses.notchedOutline}`]: {
                  display: 'none',
                },
                [`& .${outlinedInputClasses.root}.Mui-focused .${outlinedInputClasses.notchedOutline}`]:
                  {
                    display: 'block',
                  },
              },
            }}
          >
            <GridToolbarQuickFilter
              slotProps={{
                root: {
                  size: 'small',
                },
              }}
            />
          </Box>

          <ToolbarColumnsItem {...itemProps} />
          <ToolbarFilterItem {...itemProps} />
          <ToolbarSortItem {...itemProps} />
          <ToolbarDensityItem {...itemProps} />
          <ToolbarAddItem {...itemProps} handleUpload={handleUpload} />
        </React.Fragment>
      )}
    </GridToolbarContainer>
  );
}
