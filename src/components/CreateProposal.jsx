import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { raiseProposal } from '../Posteconomy'
import { setGlobalState, useGlobalState } from '../store'
import { toast } from 'react-toastify'
import {createProposal} from "../PosteconomyV2";

const CreateProposal = ({daoAddr, user_avatar, start, end}) => {
  const [createProposalModal] = useGlobalState('createProposalModal')
  const [title, setTitle] = useState('')
  const [initiator, setInitiator] = useState('')
  const [amount, setAmount] = useState('')
  const [beneficiary, setBeneficiary] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // if (!title || !description || !beneficiary || !amount || !initiator) return
    createProposal(daoAddr, title, description, beneficiary, start, end).then(res => {
      toast.success('Proposal created, reloading in progress...')
      closeModal()
      // window.location.reload()
    })
  }

  const closeModal = () => {
    setGlobalState('createProposalModal', 'scale-0')
    resetForm()
  }

  const resetForm = () => {
    setTitle('')
    setAmount('')
    setInitiator('')
    setBeneficiary('')
    setDescription('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
      justify-center bg-black bg-opacity-50 transform z-50
      transition-transform duration-300 ${createProposalModal}`}
    >
      <h1>Test</h1>
      <div className="bg-white dark:bg-[#212936] shadow-xl shadow-[#122643] dark:shadow-gray-500 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Raise Proposal</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">
            <input
              className="block w-full text-sm
              bg-transparent border-0
              focus:outline-none focus:ring-0"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          {/*<div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">*/}
          {/*  <input*/}
          {/*    className="block w-full text-sm*/}
          {/*    bg-transparent border-0*/}
          {/*    focus:outline-none focus:ring-0"*/}
          {/*    type="text"*/}
          {/*    name="initiator"*/}
          {/*    placeholder="Initiator's address"*/}
          {/*    onChange={(e) => setInitiator(e.target.value)}*/}
          {/*    value={initiator}*/}
          {/*    required*/}
          {/*  />*/}
          {/*</div>*/}

          {/*<div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">*/}
          {/*  <input*/}
          {/*    className="block w-full text-sm*/}
          {/*    bg-transparent border-0*/}
          {/*    focus:outline-none focus:ring-0"*/}
          {/*    type="text"*/}
          {/*    name="amount"*/}
          {/*    placeholder="Amount required to complete the initiative, e.g 2.5 Eth"*/}
          {/*    onChange={(e) => setAmount(e.target.value)}*/}
          {/*    value={amount}*/}
          {/*    required*/}
          {/*  />*/}
          {/*</div>*/}

          <div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">
            <input
              className="block w-full text-sm
              bg-transparent border-0
              focus:outline-none focus:ring-0"
              type="text"
              name="beneficiary"
              placeholder="Beneficiary Address"
              onChange={(e) => setBeneficiary(e.target.value)}
              value={beneficiary}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">
            <textarea
              className="block w-full text-sm resize-none
              bg-transparent border-0
              focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Initiative description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            className="rounded-lg px-6 py-2.5 bg-blue-600
              text-white font-medium text-xs leading-tight
              uppercase hover:bg-blue-700 focus:bg-blue-700
              focus:outline-none focus:ring-0 active:bg-blue-800
              transition duration-150 ease-in-out mt-5"
            onClick={handleSubmit}
          >
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProposal
