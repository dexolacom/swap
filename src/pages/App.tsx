import React, { Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './AddLiquidity/redirects'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import AddLiquidity from './AddLiquidity'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import Swap from './Swap'
import Migration from './Migration'
import { RedirectPathToSwapOnly } from './Swap/redirects'

const AppWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  /*fix for kiwi browser*/
  height: auto;
  min-height: 100vh !important;
  @media screen and (min-width: 720px) {
    min-height: auto;
    height: 100vh;
  }
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: start;
  z-index: 1;
  flex: 1;
  /*fix for kiwi browser*/
  @media screen and (max-width: 720px) {
    padding: 78px 8px 8px 8px;
  }
`

export default function App() {
  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <BodyWrapper>
            <Popups />
            <Web3ReactManager>
              <Switch>
                <Route exact strict path="/swap" component={Swap} />
                <Route exact strict path="/find" component={PoolFinder} />
                <Route exact strict path="/pool" component={Pool} />
                <Route exact path="/add" component={AddLiquidity} />
                <Route exact path="/migrate" component={Migration} />
                <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

                {/* Redirection: These old routes are still used in the code base */}
                <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />

                <Route component={RedirectPathToSwapOnly} />
              </Switch>
            </Web3ReactManager>
          </BodyWrapper>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
