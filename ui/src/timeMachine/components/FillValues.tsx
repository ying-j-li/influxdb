// Libraries
import React, {FunctionComponent} from 'react'
import {connect, ConnectedProps} from 'react-redux'

// Components
import {
  InputLabel,
  FlexBox,
  ComponentSize,
  ComponentColor,
  Toggle,
  InputToggleType,
  QuestionMarkTooltip,
} from '@influxdata/clockface'

// Actions
import {setAggregateFillValues} from 'src/timeMachine/actions/queryBuilder'

// Utils
import {getActiveQuery} from 'src/timeMachine/selectors'

// Types
import {AppState} from 'src/types'

type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps

const FillValues: FunctionComponent<Props> = ({
  fillValues,
  onSetAggregateFillValues,
}) => {
  const onChangeFillValues = () => {
    onSetAggregateFillValues(!fillValues)
  }
  return (
    <>
      <Toggle
        id="isFillValues"
        type={InputToggleType.Checkbox}
        checked={fillValues}
        onChange={onChangeFillValues}
        color={ComponentColor.Primary}
        size={ComponentSize.ExtraSmall}
      />
      <FlexBox.Child grow={1}>
        <InputLabel>Fill missing values</InputLabel>
      </FlexBox.Child>
      <QuestionMarkTooltip
        diameter={16}
        tooltipContents="Tooltip goes here!"
        tooltipStyle={{fontSize: '13px', padding: '8px'}}
      />
    </>
  )
}

const mstp = (state: AppState) => {
  const {builderConfig} = getActiveQuery(state)
  const {
    aggregateWindow: {fillValues},
  } = builderConfig

  return {
    fillValues,
  }
}

const mdtp = {
  onSetAggregateFillValues: setAggregateFillValues,
}

const connector = connect(mstp, mdtp)

export default connector(FillValues)