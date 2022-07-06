/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-new-func */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */

import React, {useEffect, useState } from 'react'

// Create your file and import components from recharts
import { ComposedChart, Area, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import lodash from 'lodash'
import defaultStyleOptions from './defaultStyleOptions'

const Types = {
  bar: Bar,
  line: Line,
  area: Area
}

export const ChartGenerator = ({chart}) => {

  const data= [
    { x: 'Alfred', salary: 87 },
    { x: 'Greg',  salary: 57 },
    { x: 'Bred',  salary: 67 },
    { x: 'Tom',   salary: 27 },
    { x: 'Richard',   salary: 37 },
    { x: 'Wald',   salary: 77 },
  ];
  const options = {...defaultStyleOptions, ...chart.options1};
  const series = [
    {
      fill: 'rgba(97, 125, 233, 0.6)',
      stroke: '#617DE9',
      type: 'monotone',
      label: true,
      _type: 'area'
    }
  ];
console.log('---', series)
console.log('-------------', data)
  
  const renderTooltip = () => {
    return ({ active, payload, label }) => {
      if (!payload) return null
      if (!active) return null

      return (
        <div
          className='tooltip'
          style={lodash.get(options, 'tooltip.style')}
        >
          <p 
            className='label'
            style={lodash.get(options, 'tooltip.styleLabel')}
          >
            {label}
          </p>
          
          {payload.map((p, index) => {
            const color = p.fill

            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={lodash.get(options, 'tooltip.styleContent')}
              >
                <p
                  className='value'
                  style={lodash.get(options, 'tooltip.styleName')}
                >
                  <i
                    style={{
                      color,
                      marginRight: '10px',
                      opacity: p.fillOpacity ? p.fillOpacity : 1
                    }}
                  />
                  {`${p.name}:`}
                </p>
                <p style={lodash.get(options, 'tooltip.styleValue')}>   
                  {p.value}
                </p>
              </div>
            )
          })}
          
        </div>
      )
    }
  }
  
  const renderXLabel = () => {
    return ({payload, x, y}) => {
      // eslint-disable-next-line prefer-const
      let { x: xOption, y: yOption, ...textOptions } = lodash.get(options, 'xAxis.tickStyle') || {}
      
      xOption = xOption || 0
      yOption = yOption || 0
      
      textOptions.textAnchor = textOptions.textAnchor || 'end'
      textOptions.fill = textOptions.fill || '#3E4550'
      textOptions.fontSize = textOptions.fontSize || '13'
      
      // eslint-disable-next-line prefer-const
      let label = payload.value 
      
      // if (this.state.xAxis.isTemporal()) {
      //   label = this.state.xAxis.formatFromTimestamp(payload.value)
      // }
      
      return (
        <g transform={`translate(${x + xOption},${y + yOption})`}>
          <text x={0} y={0} dy={16} {...textOptions}>{label}</text>
        </g>
      )
    }
  }
  
  const renderYLabel = (yAxis) => {
    return ({payload, x, y}) => {
      // eslint-disable-next-line prefer-const
      let { x: xOption, y: yOption, ...textOptions } = lodash.get(yAxis, 'tickStyle') || {}
      
      xOption = xOption || 0
      yOption = yOption || 0
      
      textOptions.textAnchor = textOptions.textAnchor || 'end'
      textOptions.fill = textOptions.fill || '#97A7B7'
      textOptions.fontSize = textOptions.fontSize || '13'
      
      return (
        <g transform={`translate(${x + xOption},${y + yOption})`}>
          <text x={0} y={0} dy={0} {...textOptions}>        
            {yAxisTickFormatter(payload.value, yAxis)}
          </text>
        </g>
      )
    }
  }
  
  const renderCustomizedLabel = ({x, y, value, index}, serie, dataLength) => {
    
    // if dataLength is to big, we only display some indexes
    if ((serie.label && dataLength <= 25) || (serie.label && dataLength > 25 && dataLength <= 50 && index % 2 === 0) || (serie.label && dataLength > 50 && index % 4 === 0)) {
      const { ...labelOptions } = lodash.get(serie, 'labelStyle')
      
      // labelOptions.textAnchor = textOptions.textAnchor || 'middle'
      // labelOptions.fill = textOptions.fill || '#97A7B7'
      // labelOptions.fontSize = textOptions.fontSize || '11'
      
      return (
        <text x={x} y={y} dy={-10} {...labelOptions}>
          {value}
        </text>
      )
    }
    
    return null
  }
  
  const renderSeries = () => {
    // You can sort your series if you want one to appear before another
    // for example by passing a number to the key 'order' in the options.series
    series.sort((s1, s2) => {
      if (s1.order < s2.order) return -1
      if (s1.order > s2.order) return 1
      return 0
    })
    
    return series.map((serie) => {
      
      
      return (
        <div
          dataKey={serie.key}
          {...serie}
          label={(props) => renderCustomizedLabel(props, serie, data.length)}
        />
      )
    })
  }
  
  const generateAxisDomain = (domain) => {
    domain.forEach((value, i) => {
      if (value && value.indexOf('=>') !== -1) {
        const tmp = value.split('=>')
        domain[i] = new Function(tmp[0], `return ${  tmp[1]}`)
      }
    })
    
    return domain
  }
  
  const renderXAxis = (xAxes) => {
    xAxes = xAxes || [{}]
    
    if (!Array.isArray(xAxes)) xAxes = [xAxes]
    
    return xAxes.map((xAxis, i) => {
      if (xAxis.domain) generateAxisDomain(xAxis.domain)
      
      return (
        <XAxis
          key={`x-${  i}`}
          dataKey='x'
          tickCount={data.length || 5}
          tick={renderXLabel(xAxis)}
          {...xAxis}
        />
      )
    })
  }
  
  const renderYAxis = (yAxes) => {
    yAxes = yAxes || [{}]
    
    if (!Array.isArray(yAxes)) yAxes = [yAxes]
    
    return yAxes.map((yAxis, i) => {
      if (yAxis.domain) generateAxisDomain(yAxis.domain)
      
      return (
        <YAxis
          key={`y-${  i}`}
          tick={renderYLabel(yAxis)}
          {...yAxis}
        />
      )
    })
  }
  
    return (
      
      <ResponsiveContainer width={700} height="80%">
        <ComposedChart
          {...options}
          data={data}
        >
          <CartesianGrid styles={{...options.cartesianGrid}} />
          {!lodash.get(options, 'legend.hide') &&
          <Legend {...options.legend} />}
          <Legend {...options.legend} />
          {renderSeries()}
          {renderXAxis(options.xAxis)}
          {renderYAxis(options.yAxis)}
          <Tooltip content={renderTooltip()} />
        </ComposedChart>
      </ResponsiveContainer>
    )
}