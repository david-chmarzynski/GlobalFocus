import { Button } from '@mui/material';
import React from 'react';

export default function BreakLine({addToReport}) {

    return(
        <Button 
            className='breakLine'
            variant="outlined"
            color="primary"
            onClick={() => addToReport(`  \n`, `↵`)}
        >
            Retourner à la ligne
        </Button>
      )
} 