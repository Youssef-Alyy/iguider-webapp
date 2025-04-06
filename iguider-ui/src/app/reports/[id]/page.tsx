'use client'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import getReports from '@/app/actions'
import Link from 'next/link'
import { Button } from '@/registry/new-york/ui/button'
import { FaPlus, FaTrash, FaUndo } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation';

const ReportView = ({ params }) => {
    const [report, setReport] = useState([])
    const [paragraphs, setParagraphs] = useState([{ uuid: uuidv4(), content: '', calls: [] }])
    const [editable, setEditable] = useState(false)
    const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchReports = async () => {
            const data = await getReports()
            console.log(data)
            if (data.length > 0) {
                setParagraphs(data)
            }
        }
        fetchReports()
    }, [])

    const Section = ({ title, items, maxItems = 5 }) => {
        const [showAll, setShowAll] = React.useState(false)

        const displayItems = showAll ? items : items.slice(0, maxItems)

        return (
            <div className="space-y-4">
                <p className="text-sm font-medium text-gray-700 my-2">{title}</p>
                <div className="flex flex-wrap gap-2">
                    {displayItems.map((item, index) => (
                        <Badge key={index} variant="outline" className="px-3 py-1 rounded-lg text-sm">
                            {item}
                        </Badge>
                    ))}
                    {items.length > maxItems && (
                        <Button
                            variant="secondary"
                            size="sm"
                            className="ml-auto"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'Show less' : 'Show more'}
                        </Button>
                    )}
                </div>
            </div>
        )
    }

    const handleToggleMetadata = () => {
        setIsMetadataExpanded(prev => !prev);
    };

    const hashes = ["MD5: 12345abcde", "SHA-1: 12345abcdef", "SHA-256: 12345abcdef12345", "SHA-512: 12345abcdef12345abcdef", "CRC32: 12345678", "Additional Hash"]
    const urls = ["https://example.com/azerg", "https://example.org/azerg", "https://example.net/azerg", "https://example.info/azerg", "https://example.biz/azerg", "Additional URL"]
    const ipAddresses = ["192.168.1.1", "10.0.0.1", "172.16.0.1", "8.8.8.8", "1.1.1.1", "Additional IP"]
    const mitreTechniques = ["T1059 - Command and Scripting Interpreter", "T1204 - User Execution", "T1218 - System Binary Proxy Execution"]
    const droppedHashes = [
        "a3f5b9d4e1f3456b8a4d9c3eaf6b7d8c",
        "bc8e3f7a5c1d4e8f9a0b6c7d8e1a2b3c",
        "d5a9b3c8e2f4a1d9b6c7e8f0a1b2c3d4",
        "e1c9a8b7d5f4e2a3b0c6d7e8a9b1c3f4",
        "f2d4e8b5c9a1f3e0b6c7d8a2e9a1b3c4",
        "e1c9a8b7d5f4e2a3b0c6d7e8a9b1c3f4",
        "f2d4e8b5c9a1f3e0b6c7d8a2e9a1b3c4"
    ];

    return (
        <div className='m-4'>
            <Link href='/reports'>
                <Button className='text-white rounded-lg mb-4'>
                    Back to Reports
                </Button>
            </Link>
            {editable ? (
                <ArticleEditor
                    paragraphs={paragraphs}
                    setParagraphs={setParagraphs}
                    setView={() => setEditable(false)}
                />
            ) : (
                <div>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-3xl font-bold text-gray-800'>Report</h1>
                        <Button
                            onClick={() => setEditable(true)}
                            className='bg-green-600 text-white hover:bg-green-700 rounded-lg p-2'
                        >
                            Modify Report
                        </Button>
                    </div>
                    <div className='flex gap-6'>
                        <section className='flex-1 bg-gray-50 p-4 rounded-lg shadow-md'>
                            <h3 className='text-xl font-semibold mb-3'>Report Content</h3>
                            <hr className='mb-3' />
                            <div className='h-[60vh] overflow-y-auto border-l-4 border-blue-500 p-3 rounded-lg bg-white'>
                                {paragraphs.length === 0 ? (
                                    <div className='text-center text-gray-500'>
                                        No paragraphs available.
                                        <Button
                                            onClick={() => setEditable(true)}
                                            className='ml-4 bg-blue-600 text-white hover:bg-blue-700 rounded-lg p-2'
                                        >
                                            <FaPlus /> Add First Paragraph
                                        </Button>
                                    </div>
                                ) : (
                                    paragraphs.map((paragraph, index) => (
                                        <div key={paragraph.uuid} className='mb-4'>
                                            <p>{paragraph.content}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>

                        {paragraphs.length > 0 && (
                            <section className='w-1/3'>
                                {/* Metadata Section */}
                                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                                    <div className="text-lg font-semibold mb-4 text-blue-600 border-b-2 border-blue-300 pb-2">Metadata</div>
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isMetadataExpanded ? '' : 'max-h-24'}`}
                                    >
                                        <Section title="Malware Hash" items={hashes} />
                                        <Section title="Dropped Files Hashes" items={droppedHashes} />
                                        <Section title="URLs" items={urls} />
                                        <Section title="IP Addresses" items={ipAddresses} />
                                        <Section title="MITRE Techniques" items={mitreTechniques} />
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-4 px-4 py-2 rounded-md text-gray-700 border-gray-300 hover:bg-gray-200 transition-colors"
                                        onClick={handleToggleMetadata}
                                    >
                                        {isMetadataExpanded ? 'Reduce' : 'Expand'}
                                    </Button>
                                </div>

                                {/* Corresponding Calls Section */}
                                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                                    <h3 className='text-lg font-semibold mb-4 text-green-00 border-b-2 border-green-500 pb-2'>Corresponding Calls</h3>
                                    <div className='h-[60vh] overflow-y-auto border-l-4 border-indigo-500 p-3 rounded-lg bg-white'>
                                        {paragraphs.map((paragraph, index) => (
                                            <div key={paragraph.uuid} className='mb-4'>
                                                {paragraph.calls.length > 0 && (
                                                    <h4 className='font-semibold'>Paragraph {index + 1}:</h4>
                                                )}
                                                {paragraph.calls.map((call, callIndex) => (
                                                    <div key={callIndex} className='ml-4'>{call}</div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

ReportView.propTypes = {
    params: PropTypes.object.isRequired,
}

const ArticleEditor = ({ paragraphs, setParagraphs, setView }) => {
    const [deletedParagraphs, setDeletedParagraphs] = useState([])
    const MAX_PARAGRAPHS = 7

    const addParagraph = index => {
        if (paragraphs.length < MAX_PARAGRAPHS) {
            const newParagraph = { uuid: uuidv4(), content: '', calls: [] }
            const updatedParagraphs = [
                ...paragraphs.slice(0, index),
                newParagraph,
                ...paragraphs.slice(index),
            ]
            setParagraphs(updatedParagraphs)
        }
    }

    const updateParagraph = (index, newText) => {
        const updatedParagraphs = paragraphs.map((paragraph, i) =>
            i === index ? { ...paragraph, content: newText } : paragraph,
        )
        setParagraphs(updatedParagraphs)
    }

    const deleteParagraph = index => {
        const updatedParagraphs = paragraphs.filter((_, i) => i !== index)
        const [deletedParagraph] = paragraphs.slice(index, index + 1)
        setDeletedParagraphs([{ ...deletedParagraph, index }, ...deletedParagraphs])
        setParagraphs(updatedParagraphs)
    }

    const undoDelete = () => {
        if (deletedParagraphs.length > 0) {
            const [{ content, uuid, calls, index }, ...remainingDeleted] = deletedParagraphs
            if (paragraphs.length < MAX_PARAGRAPHS) {
                const updatedParagraphs = [
                    ...paragraphs.slice(0, index),
                    { uuid, content, calls },
                    ...paragraphs.slice(index),
                ]
                setParagraphs(updatedParagraphs)
                setDeletedParagraphs(remainingDeleted)
            }
        }
    }

    const handleSave = () => {
        let filteredParagraphs = paragraphs.filter(paragraph => paragraph.content.trim() !== '')
        if (filteredParagraphs.length === 0) {
            filteredParagraphs = [{ uuid: uuidv4(), content: '', calls: [] }]
        }
        setParagraphs(filteredParagraphs)
        const originalFormat = mapToOriginalFormat(filteredParagraphs)
        console.log(originalFormat)
        setView()
    }

    function mapToOriginalFormat(modifiedData) {
        const originalFormat = {
            paragraphs: [],
            calls: [],
            links: [],
        }
        const callMap = new Map()
        modifiedData.forEach(paragraph => {
            const { uuid, content, calls } = paragraph
            originalFormat.paragraphs.push({ uuid, content })
            calls.forEach(call => {
                if (!callMap.has(call)) {
                    const callUuid = (originalFormat.calls.length + 1).toString()
                    originalFormat.calls.push({ uuid: callUuid, content: call })
                    callMap.set(call, callUuid)
                }
            })
            const linkedCalls = calls.map(call => callMap.get(call))
            if (linkedCalls.length > 0) {
                originalFormat.links.push({ paragraph: uuid, calls: linkedCalls })
            }
        })
        return originalFormat
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault()
                undoDelete()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [deletedParagraphs, paragraphs])

    return (
        <div className='m-4'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-3xl font-bold text-gray-800'>Edit Report</h1>
                <div className='flex gap-2'>
                    {deletedParagraphs.length > 0 && paragraphs.length < MAX_PARAGRAPHS && (
                        <Button
                            onClick={undoDelete}
                            className='bg-yellow-500 text-white hover:bg-yellow-600 rounded-lg p-2'
                        >
                            <FaUndo /> &nbsp; Undo
                        </Button>
                    )}
                    <Button
                        onClick={handleSave}
                        className='bg-green-600 text-white hover:bg-green-700 rounded-lg p-2'
                    >
                        Save Report
                    </Button>
                </div>
            </div>
            <div className='flex gap-6'>
                <section className='flex-1 bg-gray-50 p-4 rounded-lg shadow-md'>
                    <h3 className='text-xl font-semibold mb-3'>Report Content</h3>
                    <hr className='mb-3' />
                    <div className='h-[60vh] overflow-y-auto border-l-4 border-blue-500 p-3 rounded-lg bg-white'>
                        {paragraphs.length === 0 ? (
                            <div className='text-center text-gray-500'>
                                No paragraphs available.
                                <Button
                                    onClick={() => addParagraph(0)}
                                    className={`ml-4 p-2 rounded-lg ${paragraphs.length >= MAX_PARAGRAPHS ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                    disabled={paragraphs.length >= MAX_PARAGRAPHS}
                                >
                                    <FaPlus /> &nbsp; Add First Paragraph
                                </Button>
                            </div>
                        ) : (
                            paragraphs.map((paragraph, index) => (
                                <div key={paragraph.uuid} className='flex items-center mb-4'>
                                    <textarea
                                        className='w-full border-2 border-gray-300 rounded-lg p-3'
                                        value={paragraph.content}
                                        onChange={e => updateParagraph(index, e.target.value)}
                                        maxLength={2200}
                                    />
                                    <button
                                        onClick={() => deleteParagraph(index)}
                                        className='ml-2 bg-red-600 text-white hover:bg-red-700 rounded-lg p-2'
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        onClick={() => addParagraph(index + 1)}
                                        className={`ml-2 ${paragraphs.length >= MAX_PARAGRAPHS ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'} rounded-lg p-2`}
                                        disabled={paragraphs.length >= MAX_PARAGRAPHS}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}

ArticleEditor.propTypes = {
    paragraphs: PropTypes.array.isRequired,
    setParagraphs: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
}

export default ReportView
export { ArticleEditor }
