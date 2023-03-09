import { Button, Col, Container, Row, Form, Spinner } from "react-bootstrap";
import React, { useState,useCallback  } from "react";

import useBunzz from '../hooks/useBunzz';

import { approve, getErc20VotesContract, mint, decreaseAllowance, increaseAllowance, delegate, delegateBySig, getVotes } from '../contracts/utils'
import { useWeb3React } from "@web3-react/core";

import { bnToDec, isAddress } from "../utils";
const Creator = () => {
    const bunzz = useBunzz();
    const { account} = useWeb3React();
    const erc20VotesContract = getErc20VotesContract(bunzz);

    const [mintAmount, setMintAmount] = useState(0);
    const [approveAmount, setApproveAmount] = useState(0);
    const [approveSpenderAddress, setApproveSpenderAddress] = useState("");
    const [inDeSpenderAddress, setInDeSpenderAddress] = useState("");
    const [increaseDecreaseAmount, setIncreaseDecreaseAmount] = useState(0);
    const [delegatee, setDelegatee] = useState("");
    const [nonce, setNonce] = useState(0);
    const [expiry, setExpiry] = useState(0);
    const [v, setV] = useState(0);
    const [r, setR] = useState(0);
    const [s, setS] = useState(0);
    
    const [votes, setVotes] = useState(0);
    const [votesAddress, setVotesAddress] = useState("");
  

    const [pendingMint, setPendingMint] = useState(false);
    const [pendingIncreaseAllowance, setPendingIncreaseAllowance] = useState(false);
    const [pendingDecreaseAllowance, setPendingDecreaseAllowance] = useState(false);
    const [pendingApprove, setPendingApprove] = useState(false);
    const [pendingDelegate, setPendingDelegate] = useState(false);
    const [pendingDelegateBySig, setPendingDelegateBySig] = useState(false);
  
   
   
    const handleGetVotes = useCallback(async () => {
        try { 
            const votes = await getVotes(erc20VotesContract,votesAddress );
            console.log("asdf = ",votes)
            setVotes(votes);
        } catch (e) {
            console.log(e);
        }
    }, [votesAddress]);
   


    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col lg="4" md="4" xs="12">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Input Amount</Form.Label>
                            <Form.Control type="email" placeholder="Enter amount" value={mintAmount} onChange={(val) => setMintAmount(val.target.value)} />
                        </Form.Group>
                            {!pendingMint ?
                                <Button className="mx-3" variant="dark" onClick={async () => {
                                    setPendingMint(true);
                                try {
                                    let txHash;
                                    
                                    txHash = await mint(
                                        erc20VotesContract,
                                        mintAmount,
                                        account,
                                    );
                                
                                    console.log(txHash);
                                    setPendingMint(false);
                                    
                                } catch (e) {
                                    console.log(e);
                                    setPendingMint(false);
                                    
                                }
                            }}>
                                Mint
                            </Button>
                            :
                            <Button className="mx-3 " variant="dark">
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />{` `} Mint
                            </Button>
                        }
                      



                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Input Amount</Form.Label>
                            <Form.Control type="email" placeholder="Enter value" value={approveAmount} onChange={(val) => setApproveAmount(val.target.value)} />
                            <Form.Label>Input SpenderAddress</Form.Label>
                            <Form.Control type="email" placeholder="Enter address" value={approveSpenderAddress} onChange={(val) => setApproveSpenderAddress(val.target.value)} />
                        </Form.Group>

                        {!pendingApprove ?
                                <Button className="mx-3" variant="dark" onClick={async () => {
                                    setPendingApprove(true);
                                try {
                                    let txHash;
                                    
                                    txHash = await approve(
                                        erc20VotesContract,
                                        approveSpenderAddress,
                                        approveAmount,
                                        account,
                                    );
                                
                                    console.log(txHash);
                                    setPendingApprove(false);
                                    
                                } catch (e) {
                                    console.log(e);
                                    setPendingApprove(false);
                                    
                                }
                            }}>
                                Approve
                            </Button>
                            :
                            <Button className="mx-3 " variant="dark">
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />{` `} Approve
                            </Button>
                        }
                       
                       <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Input Amount</Form.Label>
                            <Form.Control type="email" placeholder="Enter value" value={increaseDecreaseAmount} onChange={(val) => setIncreaseDecreaseAmount(val.target.value)} />
                            <Form.Label>Input SpenderAddress</Form.Label>
                            <Form.Control type="email" placeholder="Enter address" value={inDeSpenderAddress} onChange={(val) => setInDeSpenderAddress(val.target.value)} />
                        </Form.Group>
                        {!pendingIncreaseAllowance ?
                                <Button className="mx-3" variant="dark" onClick={async () => {
                                    setPendingIncreaseAllowance(true);
                                try {
                                    let txHash;
                                    
                                    txHash = await increaseAllowance(
                                        erc20VotesContract,
                                        inDeSpenderAddress,
                                        increaseDecreaseAmount,
                                        account,
                                    );
                                
                                    console.log(txHash);
                                    setPendingIncreaseAllowance(false);
                                    
                                } catch (e) {
                                    console.log(e);
                                    setPendingIncreaseAllowance(false);
                                    
                                }
                            }}>
                                IncreaseAllowance
                            </Button>
                            :
                            <Button className="mx-3" variant="dark">
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />{` `} IncreaseAllowance
                            </Button>
                        }
                        {!pendingDecreaseAllowance ?
                                <Button className="mx-3" variant="dark" onClick={async () => {
                                    setPendingDecreaseAllowance(true);
                                try {
                                    let txHash;
                                    
                                    txHash = await decreaseAllowance(
                                        erc20VotesContract,
                                        inDeSpenderAddress,
                                        increaseDecreaseAmount,
                                        account,
                                    );
                                
                                    console.log(txHash);
                                    setPendingDecreaseAllowance(false);
                                    
                                } catch (e) {
                                    console.log(e);
                                    setPendingDecreaseAllowance(false);
                                    
                                }
                            }}>
                                DecreaseAllowance
                            </Button>
                            :
                            <Button className="mx-3" variant="dark">
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />{` `} DecreaseAllowance
                            </Button>
                        }

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Input Delegatee Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter address" value={delegatee} onChange={(val) => setDelegatee(val.target.value)} />
                            <Form.Label>Input Nonce</Form.Label>
                            <Form.Control type="email" placeholder="Enter value" value={nonce} onChange={(val) => setNonce(val.target.value)} />
                            <Form.Label>Input Expiry</Form.Label>
                            <Form.Control type="email" placeholder="Enter value" value={expiry} onChange={(val) => setExpiry(val.target.value)} />
                            <Form.Label>Input V</Form.Label>
                            <Form.Control type="email" placeholder="Enter value" value={v} onChange={(val) => setV(val.target.value)} />
                            <Form.Label>Input R</Form.Label>
                            <Form.Control type="email" placeholder="Enter value" value={r} onChange={(val) => setR(val.target.value)} />
                            <Form.Label>Input S</Form.Label>
                            <Form.Control type="email" placeholder="Enter value" value={s} onChange={(val) => setS(val.target.value)} />
                        </Form.Group>
                        {!pendingDelegate ?
                                <Button className="mx-3" variant="dark" onClick={async () => {
                                    setPendingDelegate(true);
                                try {
                                    let txHash;
                                    txHash = await delegate(
                                        erc20VotesContract,
                                        delegatee,
                                        account,
                                    );
                                
                                    console.log(txHash);
                                    setPendingDelegate(false);
                                    
                                } catch (e) {
                                    console.log(e);
                                    setPendingDelegate(false);
                                    
                                }
                            }}>
                                Delegate
                            </Button>
                            :
                            <Button className="mx-3" variant="dark">
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />{` `} Delegate
                            </Button>
                        }
                        {!pendingDelegateBySig ?
                                <Button className="mx-3" variant="dark" onClick={async () => {
                                    setPendingDelegateBySig(true);
                                try {
                                    let txHash;
                                    txHash = await delegateBySig(
                                        erc20VotesContract,
                                        delegatee,
                                        nonce,
                                        expiry,
                                        v,
                                        r,
                                        s,
                                        account,
                                    );
                                
                                    console.log(txHash);
                                    setPendingDelegateBySig(false);
                                    
                                } catch (e) {
                                    console.log(e);
                                    setPendingDelegateBySig(false);
                                    
                                }
                            }}>
                                DelegateBySig
                            </Button>
                            :
                            <Button className="mx-3" variant="dark">
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />{` `} DelegateBySig
                            </Button>
                        }
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Input Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter address" value={votesAddress} onChange={(val) => setVotesAddress(val.target.value)} />
                          
                        </Form.Group>
                        <Button className="mx-3" variant="dark" onClick={handleGetVotes}>
                             
                                GetVotes
                        </Button>
                        {votes}
                    </Form>     
                </Col>
            </Row>
        </Container>
    )
}

export default Creator;