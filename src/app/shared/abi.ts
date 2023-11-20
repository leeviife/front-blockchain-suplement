export const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_manufacturer',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_proteins',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_carbs',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_fats',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_expiryDate',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: '_ownerSignature',
        type: 'bytes',
      },
      {
        internalType: 'bytes32',
        name: 'messageHash',
        type: 'bytes32',
      },
    ],
    name: 'addSupplement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_supplementId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_signer',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_authorization',
        type: 'bool',
      },
    ],
    name: 'setSignerAuthorization',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_supplementId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes',
      },
      {
        internalType: 'bytes32',
        name: 'messageHash',
        type: 'bytes32',
      },
    ],
    name: 'signSupplement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'authorizedSigners',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_supplementId',
        type: 'uint256',
      },
    ],
    name: 'getSupplementInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'manufacturer',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'proteins',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'carbs',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fats',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'expiryDate',
            type: 'string',
          },
        ],
        internalType: 'struct SupplementTracker.SupplementInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_supplementId',
        type: 'uint256',
      },
    ],
    name: 'getSupplementSignatures',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'signer',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'messageHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        internalType: 'struct SupplementTracker.SupplementSignature[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'supplements',
    outputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'manufacturer',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'proteins',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'carbs',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fats',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'expiryDate',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'supplementsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'supplementsSignatures',
    outputs: [
      {
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'messageHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
