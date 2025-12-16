"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Wallet, Send, RefreshCw, CheckCircle2, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Simple ABI for HelloWorld contract
const CONTRACT_ABI = [
  {
    constant: true,
    inputs: [],
    name: "message",
    outputs: [{ name: "", type: "string" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "newMessage", type: "string" }],
    name: "update",
    outputs: [],
    type: "function",
  },
]

export default function Web3DApp() {
  const [account, setAccount] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [newMessage, setNewMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [contractAddress, setContractAddress] = useState<string>("0x...")
  const { toast } = useToast()

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window as any
      if (!ethereum) return

      const accounts = await ethereum.request({ method: "eth_accounts" })
      if (accounts.length > 0) {
        setAccount(accounts[0])
      }
    } catch (error) {
      console.error("[v0] Error checking wallet:", error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any
      if (!ethereum) {
        toast({
          title: "MetaMask not found",
          description: "Please install MetaMask to use this dApp",
          variant: "destructive",
        })
        return
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      })

      setAccount(accounts[0])
      toast({
        title: "Wallet connected",
        description: `Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      })
    } catch (error) {
      console.error("[v0] Error connecting wallet:", error)
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet",
        variant: "destructive",
      })
    }
  }

  const readMessage = async () => {
    if (!contractAddress.startsWith("0x") || contractAddress === "0x...") {
      toast({
        title: "Contract address required",
        description: "Please enter a valid contract address",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const { ethereum } = window as any
      const provider = new (window as any).ethers.providers.Web3Provider(ethereum)
      const contract = new (window as any).ethers.Contract(contractAddress, CONTRACT_ABI, provider)

      const msg = await contract.message()
      setMessage(msg)

      toast({
        title: "Message retrieved",
        description: "Successfully read from contract",
      })
    } catch (error) {
      console.error("[v0] Error reading message:", error)
      toast({
        title: "Read failed",
        description: "Failed to read message from contract",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateMessage = async () => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    if (!newMessage.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message to update",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const { ethereum } = window as any
      const provider = new (window as any).ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new (window as any).ethers.Contract(contractAddress, CONTRACT_ABI, signer)

      const tx = await contract.update(newMessage)

      toast({
        title: "Transaction sent",
        description: "Waiting for confirmation...",
      })

      await tx.wait()

      toast({
        title: "Transaction confirmed",
        description: "Message updated successfully",
      })

      setNewMessage("")
      await readMessage()
    } catch (error) {
      console.error("[v0] Error updating message:", error)
      toast({
        title: "Update failed",
        description: "Failed to update message",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="container relative mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-balance">HelloWorld dApp</h1>
          </div>

          {account ? (
            <Badge variant="secondary" className="px-4 py-2 text-sm font-mono">
              <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
              {account.slice(0, 6)}...{account.slice(-4)}
            </Badge>
          ) : (
            <Button onClick={connectWallet} size="lg">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          )}
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Contract Address */}
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Contract Address</label>
            <Input
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="0x..."
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground mt-2">Enter your deployed HelloWorld contract address</p>
          </Card>

          {/* Read Message */}
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-balance">Current Message</h2>
              <Button onClick={readMessage} disabled={loading} variant="outline" size="sm">
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Read
              </Button>
            </div>

            <div className="min-h-[80px] rounded-lg bg-muted/50 p-4 border border-border/50">
              {message ? (
                <p className="text-foreground text-pretty">{message}</p>
              ) : (
                <p className="text-muted-foreground italic">
                  No message loaded. Click Read to fetch the current message.
                </p>
              )}
            </div>
          </Card>

          {/* Update Message */}
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
            <h2 className="text-lg font-semibold mb-4 text-balance">Update Message</h2>

            <div className="space-y-4">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter new message..."
                disabled={!account || loading}
              />

              <Button
                onClick={updateMessage}
                disabled={!account || loading || !newMessage.trim()}
                className="w-full"
                size="lg"
              >
                <Send className="w-4 h-4 mr-2" />
                {loading ? "Processing..." : "Send Transaction"}
              </Button>
            </div>

            {!account && (
              <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="text-pretty">Connect your wallet to update the message</p>
              </div>
            )}
          </Card>

          {/* Info Card */}
          <Card className="p-6 border-primary/20 bg-primary/5">
            <h3 className="text-sm font-semibold mb-2 text-balance">About this dApp</h3>
            <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
              This is a Web3 application that interacts with a HelloWorld smart contract on the Ethereum blockchain.
              Connect your MetaMask wallet to read and update messages stored on-chain.
            </p>
          </Card>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
