
type Props = {
    config: any;
    data: any;
}

const Table = ({config, data}: Props) => {
    const renderedRows = data.map((company: any, index: number) => {
        return (
            <tr key={index}>
                {config.map((val: any, index: number) => {
                    return (
                        <td className='p-3' key={index}>
                            {val.render(company)}
                        </td>
                    )
                })}
            </tr>
        )
    })
    const renderedHeaders = config.map((config: any) => {
        return (
            <th className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' key={config.label}>
                {config.label}
            </th>
        )
    })
  return (
    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
        <table>
            <thead className='min-w-full divide-y divide=gray-200 m-5'>
                <tr>
                    {renderedHeaders}
                </tr>
            </thead>
            <tbody>{renderedRows}</tbody>
        </table>
    </div>
  )
}

export default Table